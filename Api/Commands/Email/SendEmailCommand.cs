﻿using System.Net.Mail;
using System.Text.Json.Serialization;
using Common;
using Common.Interface;

namespace Commands.Email
{
    public class SendEmailCommand : Command<Result>
    {
        [JsonIgnore]
        public MailMessage MailMessage { get; set; }

        public SendEmailCommand()
        {

        }

        public SendEmailCommand(Message parentMsg, MailMessage mailMessage)
        {
            MessageId = parentMsg.MessageId;
            MailMessage = mailMessage;
        }

        public SendEmailCommand(Message parentMsg, ILoggedOnUserProvider user, MailMessage mailMessage)
        {
            MessageId = parentMsg.MessageId;
            SetUser(user);
            MailMessage = mailMessage;
        }
    }
}
