using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace ProjektWPF
{
    public class PollService
    {
        private readonly HttpClient _httpClient;

        public PollService()
        {
            _httpClient = new HttpClient();
        }

        public async Task<List<Poll>> GetPollsAsync()
        {
            try
            {
                string url = "https://localhost:7285/api/Poll/All";
                HttpResponseMessage response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string json = await response.Content.ReadAsStringAsync();

                    // 🔴 Itt List<Poll> típusként deszerializáljuk!
                    List<Poll> polls = JsonSerializer.Deserialize<List<Poll>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                    return polls ?? new List<Poll>(); // Ha null, akkor üres listát adunk vissza
                }
                else
                {
                    throw new Exception($"Hiba történt: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hiba: {ex.Message}");
                return new List<Poll>();
            }
        }
    }
}
