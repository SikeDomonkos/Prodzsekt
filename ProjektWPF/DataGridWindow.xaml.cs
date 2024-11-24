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
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace ProjektWPF
{
    /// <summary>
    /// Interaction logic for DataGridWindow.xaml
    /// </summary>
    public partial class DataGridWindow : Window
    {
        private List<Person> AllData;
        public DataGridWindow()
        {
            InitializeComponent();
            LoadData();

        }

        //Majd az adatbásiból kéne szedni a neveket, kort stb.
        private void LoadData()
        {
            AllData = new List<Person>
            {
                new Person { Name = "Marci", Age = 19, Email = "janosim@kkszki.hu" , PhoneNumber = 213123123,Korzet="Avas"},
                new Person { Name = "Her", Age = 19, Email = "janosim@kkszki.hu" , PhoneNumber = 213123123,Korzet="Avas"},
                new Person { Name = "Domonkos", Age = 19, Email = "siked@kkszki.hu", PhoneNumber = 213123123,Korzet = "Lyuko" },
                new Person { Name = "Szabolcs", Age = 18, Email = "kovacssz@kkszki.hu", PhoneNumber=213123123, Korzet="Mordor" } //Ha a telefonszám 0-val kezdődik lehet nem jó az int --> Person classban int
            };
            DataGridUsers.ItemsSource = AllData;
            FilterComboBox.ItemsSource = AllData
                .Select(person => person.Korzet)
                .Distinct()
                .Prepend("Mind") // Add "All" option
                .ToList();

            FilterComboBox.SelectedIndex = 0; // Select "All" by default

        }
        public class Person
        {
            public string Name { get; set; }
            public int Age { get; set; }
            public string Email { get; set; }
            
            //Lehet inkább stringnek kéne lennie mert a telefonszám 0-val kezdődik
            public int PhoneNumber { get; set; }
            public string Korzet { get; set; }
        }

        private void FilterComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            string selectedKorzet = FilterComboBox.SelectedItem as string;

            if (selectedKorzet == "Mind")
            {
                DataGridUsers.ItemsSource = AllData;
            }
            else
            {
                var filteredData = AllData.Where(person => person.Korzet == selectedKorzet).ToList();
                DataGridUsers.ItemsSource = filteredData;
            }
        }
    }
}
