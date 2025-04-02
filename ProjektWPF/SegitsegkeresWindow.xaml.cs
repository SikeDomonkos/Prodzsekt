using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace ProjektWPF
{
    public partial class SegitsegkeresWindow : Window
    {
        private readonly HttpClient _httpClient = new HttpClient();
        private List<Post> posts = new List<Post>();

        public SegitsegkeresWindow()
        {
            InitializeComponent();
            LoadPostsAsync();
        }

        private async void LoadPostsAsync()
        {
            try
            {
                string url = "https://localhost:7285/api/Post/AllWithName";
                HttpResponseMessage response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    posts = JsonSerializer.Deserialize<List<Post>>(jsonResponse, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    PostsListBox.ItemsSource = posts;
                }
                else
                {
                    MessageBox.Show("Hiba történt az adatok lekérése közben!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hálózati hiba: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void DeletePost_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button button && button.Tag is string postId)
            {
                bool confirmed = MessageBox.Show("Biztosan törölni szeretnéd ezt a posztot?",
                                                 "Megerősítés", MessageBoxButton.YesNo, MessageBoxImage.Warning) == MessageBoxResult.Yes;
                if (!confirmed) return;

                try
                {
                    string deleteUrl = $"https://localhost:7285/api/Post?id={postId}";
                    HttpResponseMessage response = await _httpClient.DeleteAsync(deleteUrl);

                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("A poszt sikeresen törölve!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);

                        posts.RemoveAll(p => p.Id == postId);
                        PostsListBox.ItemsSource = null;
                        PostsListBox.ItemsSource = posts;
                    }
                    else
                    {
                        MessageBox.Show("Nem sikerült törölni a posztot!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hálózati hiba: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }
    }
}
