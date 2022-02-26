using System;
using System.Reflection;
using Common;
using Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;

namespace Api.Controllers
{
    [ApiController]
    public class UtilityController : ControllerBase
    {
        private readonly AppSettings appSettings;
        private readonly SmtpSettings emailSettings;
        private readonly RedisSettings redisSettings;
        private readonly IDistributedCache cache;

        public UtilityController(IOptionsSnapshot<AppSettings> appSettings, IOptionsSnapshot<SmtpSettings> emailSettings, 
            IOptionsSnapshot<RedisSettings> redisSettings, IDistributedCache cache)
        {
            this.appSettings = appSettings.Value;
            this.emailSettings = emailSettings.Value;
            this.redisSettings = redisSettings.Value;
            this.cache = cache;
        }

        [HttpGet]
        [Route("api/version")]
        public string GetVersion()
        {
            return $"Assembly - {Assembly.GetExecutingAssembly().GetName().Name} " +
                   $"{Environment.NewLine}Version - {Assembly.GetExecutingAssembly().GetName().Version}" +
                   $"{Environment.NewLine}Environment - {appSettings.Environment}";
        }


        [HttpGet]
        [Route("api/smtp")]
        [Authorize]
        public string GetSmtpSettings()
        {
            return $"{emailSettings.ToJson()} ";
        }

        [HttpGet]
        [Route("api/redis")]
        [Authorize]
        public string GetRedisSettings()
        {
            return $"{redisSettings.ToJson()} ";
        }
    }
}
