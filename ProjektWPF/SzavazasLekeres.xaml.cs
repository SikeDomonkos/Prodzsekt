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
            try
            {
                var button = sender as Button;
                var pollId = button?.Tag.ToString(); // Get Poll ID from Tag

                if (!string.IsNullOrEmpty(pollId))
                {
                    // Call PollService to delete the poll
                    var result = await _pollService.DeletePollAsync(pollId);

                    if (result)
                    {
                        // Reload the polls list after deletion
                        LoadPolls();
                    }
                    else
                    {
                        MessageBox.Show("Failed to delete the poll.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
