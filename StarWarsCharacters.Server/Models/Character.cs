using Newtonsoft.Json;

namespace StarWarsProject.Models
{
    public class Character
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("birth_year")]
        public string BirthYear { get; set; }

        [JsonProperty("homeworld")]
        public string HomeworldUrl { get; set; }

        [JsonProperty("films")]
        public List<string> Films { get; set; }

    }
}
