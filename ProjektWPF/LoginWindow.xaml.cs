using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ProjektWPF
{
    public partial class LoginWindow : Window
    {
        public LoginWindow()
        {
            InitializeComponent();
        }

        private void ShowPassword(object sender, MouseButtonEventArgs e)
        {
            PasswordTextBox.Text = PasswordBox.Password;
            PasswordTextBox.Visibility = Visibility.Visible;
            PasswordBox.Visibility = Visibility.Collapsed;
        }

        private void HidePassword(object sender, MouseEventArgs e)
        {
            PasswordBox.Visibility = Visibility.Visible;
            PasswordTextBox.Visibility = Visibility.Collapsed;
        }

        private async void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            string username = UsernameBox.Text;
            string password = PasswordBox.Password;

            var loginData = new
            {
                userName = username,
                password = password
            };

            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7285");
                client.DefaultRequestHeaders.Add("Accept", "application/json");

                var jsonContent = new StringContent(JsonConvert.SerializeObject(loginData), Encoding.UTF8, "application/json");

                try
                {
                    HttpResponseMessage response = await client.PostAsync("/auth/login", jsonContent);
                    string responseContent = await response.Content.ReadAsStringAsync();

                    if (response.IsSuccessStatusCode)
                    {
                        var jsonResponse = JObject.Parse(responseContent);

                        if (jsonResponse["token"] != null && jsonResponse["token"].ToString().Length > 0)
                        {
                            string token = jsonResponse["token"].ToString();
                            string userId = jsonResponse["id"]?.ToString();
                            string loggedInUser = username;

                            if (string.IsNullOrEmpty(userId))
                            {
                                MessageBox.Show("Hiba: A bejelentkezett felhasználónak nincs azonosítója!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                                return;
                            }

                            HttpResponseMessage roleResponse = await client.GetAsync($"/auth/UserWithRole?id={userId}");
                            string roleContent = await roleResponse.Content.ReadAsStringAsync();

                            if (roleResponse.IsSuccessStatusCode)
                            {
                                var roleJson = JObject.Parse(roleContent);
                                var roles = roleJson["roles"]?.ToObject<string[]>();

                                if (roles != null && Array.Exists(roles, role => role == "admin"))
                                {
                                    MessageBox.Show("Bejelentkezés sikeres!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);

                                    MainWindow mainWindow = new MainWindow();
                                    mainWindow.LoggedInUsername = loggedInUser; // Felhasználónév
                                    mainWindow.Show();

                                    this.Close();
                                }
                                else
                                {
                                    MessageBox.Show("Nincs megfelelő jogosultságod!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                                }
                            }
                            else
                            {
                                MessageBox.Show("Hiba történt a jogosultságok lekérésekor!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                            }
                        }
                        else
                        {
                            MessageBox.Show("Hibás bejelentkezés", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                        }
                    }
                    else
                    {
                        MessageBox.Show("Hibás felhasználónév vagy jelszó!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hiba történt: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }

    }
}
