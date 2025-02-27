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

        // Load data into DataGrid
        private void LoadData()
        {
            try
            {
                // Use the class-level AllData field, not a new local variable
                AllData = FetchPersonsFromDatabase();

                // Bind data to DataGrid
                DataGridUsers.ItemsSource = AllData;

                // Populate FilterComboBox with unique 'LakasSzovNev' values
                FilterComboBox.ItemsSource = AllData
                    .Select(person => person.LakasSzovNev)
                    .Distinct()
                    .Prepend("Mind") // Add "All" option
                    .ToList();

                // Select "All" by default
                FilterComboBox.SelectedIndex = 0;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading data: {ex.Message}");
            }
        }

        // Fetch data from MySQL database
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
                                Fizetesi_elmaradas = Convert.ToDecimal(reader["Fizetesi_elmaradas"]) // Assuming decimal type
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

        // Method to handle updates after cell editing
        private void DataGridUsers_CellEditEnding(object sender, DataGridCellEditEndingEventArgs e)
        {
            if (e.EditAction == DataGridEditAction.Commit)
            {
                // Get the edited person object
                Person editedPerson = e.Row.Item as Person;

                if (editedPerson != null)
                {
                    // Update the database with the new values
                    UpdatePersonInDatabase(editedPerson);
                }
            }
        }

        // Method to update the database with the changes
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

        // Event to prevent auto-generation of columns for FizetettE_havi and Fizetesi_elmaradas
        private void DataGridUsers_AutoGeneratingColumn(object sender, DataGridAutoGeneratingColumnEventArgs e)
        {
            
                e.Cancel = true; // Prevent auto-generation of these columns
            
        }


        // Filter ComboBox selection change event
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
                    // Ensure that you only save modified data
                    UpdatePersonInDatabase(person);
                }
                MessageBox.Show("Changes saved successfully!", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error saving changes: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        // Person class definition
        public class Person
        {
            public string FullName { get; set; }

            // Remove or keep this if needed for any logic
            public DateTime DateOfBirth { get; set; }

            // This is the only one you will display
            public string DateOfBirthFormatted => DateOfBirth.ToString("yyyy-MM-dd");

            public string LakasSzovNev { get; set; }
            public string PhoneNumber { get; set; }
            public bool FizetettE_havi { get; set; }
            public decimal Fizetesi_elmaradas { get; set; }
        }


    }
}
