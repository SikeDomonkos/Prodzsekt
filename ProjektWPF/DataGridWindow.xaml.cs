using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using MySql.Data.MySqlClient;

namespace ProjektWPF
{
    public partial class DataGridWindow : Window
    {
        private List<Person> AllData;

        public DataGridWindow()
        {
            InitializeComponent();
            LoadData();
        }

        private void LoadData()
        {
            try
            {
                AllData = FetchPersonsFromDatabase();

                DataGridUsers.ItemsSource = AllData;

                FilterComboBox.ItemsSource = AllData
                    .Select(person => person.LakasSzovNev)
                    .Distinct()
                    .Prepend("Mind") 
                    .ToList();

                FilterComboBox.SelectedIndex = 0;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading data: {ex.Message}");
            }
        }

        private List<Person> FetchPersonsFromDatabase()
        {
            List<Person> persons = new List<Person>();
            string connectionString = "Server=localhost;Database=auth;User ID=root;Password=;Port=3306;";
            string query = "SELECT FullName, DateOfBirth, PhoneNumber, LakasSzovNev, FizetettE_havi, Fizetesi_elmaradas FROM aspnetusers";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);

                try
                {
                    connection.Open();
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            persons.Add(new Person
                            {
                                FullName = reader["FullName"].ToString(),
                                DateOfBirth = Convert.ToDateTime(reader["DateOfBirth"]) , 
                                LakasSzovNev = reader["LakasSzovNev"].ToString(),
                                PhoneNumber = reader["PhoneNumber"].ToString(),
                                FizetettE_havi = Convert.ToBoolean(reader["FizetettE_havi"]),
                                Fizetesi_elmaradas = Convert.ToDecimal(reader["Fizetesi_elmaradas"])
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Database error: {ex.Message}");
                }
            }
            return persons;
        }

        private void DataGridUsers_CellEditEnding(object sender, DataGridCellEditEndingEventArgs e)
        {
            if (e.EditAction == DataGridEditAction.Commit)
            {
                Person editedPerson = e.Row.Item as Person;

                if (editedPerson != null)
                {
                    UpdatePersonInDatabase(editedPerson);
                }
            }
        }

        private void UpdatePersonInDatabase(Person person)
        {
            string connectionString = "Server=localhost;Database=auth;User ID=root;Password=;Port=3306;";
            string query = "UPDATE aspnetusers SET FizetettE_havi = @FizetettE_havi, Fizetesi_elmaradas = @Fizetesi_elmaradas WHERE FullName = @FullName";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@FizetettE_havi", person.FizetettE_havi);
                command.Parameters.AddWithValue("@Fizetesi_elmaradas", person.Fizetesi_elmaradas);
                command.Parameters.AddWithValue("@FullName", person.FullName);


                try
                {
                    connection.Open();
                    command.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Error updating record: {ex.Message}");
                }
            }
        }

        private void DataGridUsers_AutoGeneratingColumn(object sender, DataGridAutoGeneratingColumnEventArgs e)
        {
            
                e.Cancel = true; 
            
        }


        private void FilterComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            string selectedLakasSzovNev = FilterComboBox.SelectedItem as string;

            if (selectedLakasSzovNev == "Mind")
            {
                DataGridUsers.ItemsSource = AllData;
            }
            else
            {
                var filteredData = AllData.Where(person => person.LakasSzovNev == selectedLakasSzovNev).ToList();
                DataGridUsers.ItemsSource = filteredData;
            }
        }

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                foreach (var person in AllData)
                {
                    UpdatePersonInDatabase(person);
                }
                MessageBox.Show("Változtatások sikeresen elmentve!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba mentéskor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
        private void SearchTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            string searchText = SearchTextBox.Text.ToLower();

            if (string.IsNullOrWhiteSpace(searchText))
            {
                DataGridUsers.ItemsSource = AllData; 
            }
            else
            {
                var filteredData = AllData
                    .Where(person => person.FullName.ToLower().Contains(searchText))
                    .ToList();

                DataGridUsers.ItemsSource = filteredData;
            }
        }
        public class Person
        {
            public string FullName { get; set; }

            public DateTime DateOfBirth { get; set; }

            public string DateOfBirthFormatted => DateOfBirth.ToString("yyyy-MM-dd");

            public string LakasSzovNev { get; set; }
            public string PhoneNumber { get; set; }
            public bool FizetettE_havi { get; set; }
            public decimal Fizetesi_elmaradas { get; set; }
        }


    }
}
