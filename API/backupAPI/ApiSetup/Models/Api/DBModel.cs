using System.Text.Json.Serialization;

namespace ApiSetupProject.Models.Api
{
    public class DBModel
    {
        public string postgresUser { get; set; }
        public string postgresPassword { get; set; }
        public string postgresHost { get; set; }
        public string postgresDatabase { get; set; }
    }
}
