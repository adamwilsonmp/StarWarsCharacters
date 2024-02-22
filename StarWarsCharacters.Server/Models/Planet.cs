using Newtonsoft.Json;

namespace StarWarsProject.Models
{
    public class Planet
    {
        [JsonProperty("name")]
        public string Name { get; set; }

    }
}
