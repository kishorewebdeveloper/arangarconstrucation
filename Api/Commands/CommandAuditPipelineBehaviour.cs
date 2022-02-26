using System;
using System.Diagnostics;
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Common;
using Data;
using Domain.CoreEntities;
using Extensions;
using MediatR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Serilog;
using ElmahCore;

namespace Commands
{
    public class CommandAuditPipelineBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : Command<TResponse> where TResponse : Result, new()
    {
        private readonly DatabaseContext context;
        private readonly Stopwatch stopwatch = new();
        private readonly ILogger logger;

        public CommandAuditPipelineBehaviour(DatabaseContext context, ILogger logger)
        {
            this.context = context;
            this.logger = logger;
        }

        public async Task<TResponse> Handle(TRequest cmd, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            var result = new TResponse();
            stopwatch.Start();

            try
            {
                cmd.Result = result = await next();
            }
            catch (AutoMapperMappingException ex)
            {
                cmd.Result = new FailureResult(ex.Demystify().Message);
                result.Exception = ex.Demystify();
            }
            catch (DbUpdateException ex)
            {
                cmd.Result = new FailureResult(PopulateDataBaseExceptionInfo(ex));
                result.Exception = ex.Demystify();
            }
            catch (SmtpException ex)
            {
                var exceptionBuilder = new StringBuilder();
                exceptionBuilder.Append(ex.Message);

                if (ex.InnerException is not null)
                    exceptionBuilder.Append(ex.InnerException.Message);

                cmd.Result = new FailureResult(exceptionBuilder.ToString());
                result.Exception = ex.Demystify();
            }
            catch (Exception ex)
            {
                cmd.Result = new FailureResult(ex.Demystify().Message);
                result.Exception = ex.Demystify();
            }
            finally
            {
                stopwatch.Stop();

                if (result.HasException)
                    LogError(cmd, result);

                if (cmd.AuditThisMessage)
                    await AuditCommand(cmd, stopwatch.Elapsed);
            }

            return result;
        }

        private void LogError(TRequest cmd, TResponse result)
        {
            result.SetFailures(cmd.Result.Failures);
            logger.Error(result.Exception.Message);
            ElmahExtensions.RiseError(result.Exception);
        }

        private async Task AuditCommand(TRequest cmd, TimeSpan timeTakenToExecuteCommand)
        {
            try
            {
                var audit = new CommandAudit
                {
                    LoggedOnUserId = cmd.LoggedOnUserId,
                    MessageId = cmd.MessageId,
                    IsSuccess = cmd.Result?.IsSuccess ?? false,
                    ExceptionMessage = GetExceptionMessageFrom(cmd),
                    Type = cmd.GetType().Name,
                    Data =  cmd.ToJson(true),
                    Milliseconds = (int)timeTakenToExecuteCommand.TotalMilliseconds,
                    IpAddress = cmd.LoggedOnUserIp
                };

                context.Add(audit);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                logger.Error(ex.Demystify().Message);
                ElmahExtensions.RiseError(ex.Demystify());
            }
        }

        private static string GetExceptionMessageFrom(TRequest cmd)
        {
            return cmd.Result?.Exception?.Message ?? cmd.Result?.Failures?.JoinWithComma().TakeCharacters(10000) ?? string.Empty;
        }

        private static string PopulateDataBaseExceptionInfo(Exception exception)
        {
            var errorMessage = string.Empty;
            var rootException = exception.GetBaseException();

            var sqlException = rootException as SqlException;
            var exceptionMessage = rootException.Message;

            if (sqlException == null)
                return exceptionMessage;

            const string sqlErrorMessage = "Cannot insert duplicate record in {0}";

            // cannot insert duplicate record
            switch (sqlException.Number)
            {
                case 515:
                    errorMessage = exceptionMessage[..exceptionMessage.IndexOf(@"INSERT", StringComparison.Ordinal)].TrimAll();
                    break;
                case 547:
                    errorMessage = "The record cannot be deleted as the information has been used in other screens.";
                    break;
                case 2601:
                    var startPos = exceptionMessage.IndexOf(@"with unique index '", StringComparison.Ordinal);
                    var endPos = exceptionMessage.IndexOf(@"'.", startPos, StringComparison.Ordinal);
                    startPos += "with unique index '".Length;
                    var indexName = exceptionMessage.Substring(startPos, (endPos - startPos));
                    var qualifiedIndexName = indexName[(indexName.IndexOf('_') + 1)..].Replace('_', ' ');
                    errorMessage = string.Format(sqlErrorMessage, qualifiedIndexName);
                    break;

            }
            return errorMessage;
        }
    }
}
