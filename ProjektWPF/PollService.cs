using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;


namespace ProjektWPF
{
    public class PollService
    {
        private readonly HttpClient _httpClient;

        public PollService()
        {
            _httpClient = new HttpClient();
        }

        // Lekéri az összes szavazást a szerverről

        public async Task<List<Poll>> GetPollsAsync()
        {
            try
            {
                string url = "https://localhost:7285/api/Poll/AllWithName";
                HttpResponseMessage response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string json = await response.Content.ReadAsStringAsync();
                    List<Poll> polls = JsonSerializer.Deserialize<List<Poll>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                    return polls ?? new List<Poll>();
                }
                else
                {
                    throw new Exception($"Error: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return new List<Poll>();
            }
        }
        //Szavazás törlése

        public async Task<bool> DeletePollAsync(string pollId)
        {
            try
            {
                string url = $"https://localhost:7285/api/Poll?id={pollId}";
                HttpResponseMessage response = await _httpClient.DeleteAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
                else
                {
                    throw new Exception($"Failed to delete poll: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting poll: {ex.Message}");
                return false;
            }
        }
    }
}
