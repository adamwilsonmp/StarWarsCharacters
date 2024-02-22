using Microsoft.AspNetCore.Mvc;
using StarWarsProject.Models;
using Newtonsoft.Json;
using StarWarsProject.Server.Models;
using System.Numerics;

namespace StarWarsProject.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StarWarsController : ControllerBase
    {
        private readonly string baseUrl = "https://swapi.dev/api/";
        private readonly ILogger<StarWarsController> _logger;

        public StarWarsController(ILogger<StarWarsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("GetCharacters")]
        public async Task<CharactersResponse> GetCharacters()
        {
            HttpClient httpClient = new();

            try
            {
                var url = $"{baseUrl}/people";
                var response = await httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var characters = JsonConvert.DeserializeObject<CharactersResponse>(content);
                    _logger.LogInformation("Successfully received Character list", characters);
                    return characters;
                }
                else
                {
                    _logger.LogWarning("Unable to retrieve our character list", response);
                    return null;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error retrieving our list", ex);
                return null;
            }
        }

        [HttpGet("GetPlanetById/{id}")]
        public async Task<Planet> GetPlanetById(int id)
        {
            HttpClient httpClient = new();

            try
            {
                var url = $"{baseUrl}/planets/{id}";
                var response = await httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var planet = JsonConvert.DeserializeObject<Planet>(content);
                    _logger.LogInformation("Successfully received planety info", planet);
                    return planet;
                }
                else
                {
                    _logger.LogWarning("Unable to retrieve plant info", response);
                    return null;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error retrieving planet info", ex);
                return null;
            }
        }

    }
}
