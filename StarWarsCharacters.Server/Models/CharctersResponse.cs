using Newtonsoft.Json;
using StarWarsProject.Models;

namespace StarWarsProject.Server.Models
{
    public class CharactersResponse
    {
        [JsonProperty("count")]
        public int Count { get; set; }

        [JsonProperty("next")]
        public string Next { get; set; }

        [JsonProperty("previous")]
        public string Previous { get; set; }

        [JsonProperty("results")]
        public List<Character> Characters { get; set; }
    }
}
