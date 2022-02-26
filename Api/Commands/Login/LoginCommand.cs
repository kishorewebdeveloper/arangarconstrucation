using System.Collections.Generic;
using System.Security.Claims;
using System.Text.Json.Serialization;
using Common;
 

namespace Commands.Login
{
    public class LoginCommand : Command<Result<IList<Claim>>>
    {
        public string UserName { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        public string Param { get; set; }
    }
}