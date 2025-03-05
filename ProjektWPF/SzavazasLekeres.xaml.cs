using System.Collections.Generic;
using System.Threading.Tasks;
using System.Windows;

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
            List<Poll> polls = await _pollService.GetPollsAsync();
            PollsListBox.ItemsSource = polls; // 🔴 Az egész listát hozzárendeljük a ListBox-hoz!
        }
    }
}
