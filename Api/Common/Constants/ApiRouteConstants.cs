namespace Common.Constants
{
    public static class ApiRouteConstants
    {
        public static class User
        {
            public const string GetByIdRoute = "/api/user/{id}";
            public const string GetRoute = "/api/users";
            public const string SaveRoute = "/api/user";
        }
        
        public static class Project
        {
            public const string GetByIdRoute = "/api/project/{id}";
            public const string GetRoute = "/api/projects";
            public const string GetProjectsWithImagesRoute = "/api/projectswithimages";
            public const string SaveRoute = "/api/project";
            public const string DeleteRoute = "/api/project/{id}";
        }

        public static class ProjectImage
        {
            public const string GetByServiceIdRoute = "/api/projectimage/{id}";
            public const string SaveRoute = "/api/projectimage";
            public const string DeleteRoute = "/api/projectimage/{id}";
        }
    }
}
