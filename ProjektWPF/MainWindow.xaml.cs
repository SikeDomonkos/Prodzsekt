using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;


namespace ProjektWPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
        private bool isSidebarOpen = false;

        private void ToggleSidebar_Click(object sender, RoutedEventArgs e)
        {
            double targetX = isSidebarOpen ? 200 : 0;
            isSidebarOpen = !isSidebarOpen;

            var animation = new DoubleAnimation
            {
                To = targetX,
                Duration = TimeSpan.FromSeconds(0.3),
                EasingFunction = new QuadraticEase()
            };

            SidebarTransform.BeginAnimation(TranslateTransform.XProperty, animation);
        }

        private void Logout_Click(object sender, RoutedEventArgs e)
        {
            foreach (Window window in Application.Current.Windows)
            {
                if (window != this) // Csak ha nem ez az ablak
                {
                    window.Close();
                }
            }

            LoginWindow loginWindow = new LoginWindow();
            loginWindow.Show();
            this.Close();
        }

        private void OpenDataGridWindow_Click(object sender, RoutedEventArgs e)
        {
            DataGridWindow dataGridWindow = new DataGridWindow();
            dataGridWindow.Show();
            
        }
        private void GetVotes_Click(object sender, RoutedEventArgs e)
        {
            SzavazasLekeres szavazasLekeres = new SzavazasLekeres();
            szavazasLekeres.Show();
        }


    }
}
