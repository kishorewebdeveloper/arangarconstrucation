﻿namespace Domain.Entities
{
    public partial class User
    {
        public string FullName => $"{FirstName} {LastName}";
    }
}
