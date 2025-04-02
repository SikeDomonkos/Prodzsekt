using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;

namespace ProjektWPF
{
    public partial class SzavazasLekeres : Window
    {
        private readonly PollService _pollService = new PollService();

        public SzavazasLekeres()
        {
            InitializeComponent();
            LoadPolls();
        }

        private async void LoadPolls()
        {
            try
            {
                List<Poll> polls = await _pollService.GetPollsAsync();
                PollsListBox.ItemsSource = polls;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Failed to load polls: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void DeletePoll_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button button && button.Tag is string pollId)
            {
                bool confirmed = MessageBox.Show("Biztosan törölni szeretnéd ezt a szavazást?",
                                                 "Megerősítés", MessageBoxButton.YesNo, MessageBoxImage.Warning) == MessageBoxResult.Yes;
                if (!confirmed) return;

                try
                {
                    var result = await _pollService.DeletePollAsync(pollId);

                    if (result)
                    {
                        MessageBox.Show("A szavazás sikeresen törölve!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                        LoadPolls(); // Lista frissítése
                    }
                    else
                    {
                        MessageBox.Show("Nem sikerült törölni a szavazást!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
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
