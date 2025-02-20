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

<<<<<<< HEAD
                // Populate FilterComboBox with unique 'LakasSzovNev' values
                FilterComboBox.ItemsSource = AllData
                    .Select(person => person.LakasSzovNev)
=======
                // Populate FilterComboBox with unique 'City' values
                FilterComboBox.ItemsSource = AllData
                    .Select(person => person.City)
>>>>>>> 6ce2ae6977f3e0e0e4cfbc6ef865dda0697aa457
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
<<<<<<< HEAD
            string connectionString = "Server=localhost;Database=auth;User ID=root;Password=;Port=3306;";
            string query = "SELECT FullName, DateOfBirth, PhoneNumber, LakasSzovNev, FizetettE_havi, Fizetesi_elmaradas FROM aspnetusers";
=======
            string connectionString = "Server=localhost;Database=project;User ID=root;Password=;Port=3306;";
            string query = "SELECT Lastname, Firstname, B_date, Phone_num, City, Zip, Street, house_num, Floor, Door, IsBehindPayment, BehindPayment FROM user_personal";
>>>>>>> 6ce2ae6977f3e0e0e4cfbc6ef865dda0697aa457

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
<<<<<<< HEAD
                                FullName = reader["FullName"].ToString(),
                                DateOfBirth = Convert.ToDateTime(reader["DateOfBirth"]) , 
                                LakasSzovNev = reader["LakasSzovNev"].ToString(),
                                PhoneNumber = reader["PhoneNumber"].ToString(),
                                FizetettE_havi = Convert.ToBoolean(reader["FizetettE_havi"]),
                                Fizetesi_elmaradas = Convert.ToDecimal(reader["Fizetesi_elmaradas"]) // Assuming decimal type
=======
                                Firstname = reader["Firstname"].ToString(),
                                Lastname = reader["Lastname"].ToString(),
                                B_date = Convert.ToDateTime(reader["B_date"]),
                                City = reader["City"].ToString(),
                                Phone_num = reader["Phone_num"].ToString(),
                                Zip = Convert.ToInt32(reader["Zip"]),
                                Street = reader["Street"].ToString(),
                                Floor = Convert.ToInt32(reader["Floor"]),
                                Door = Convert.ToInt32(reader["Door"]),
                                house_num = Convert.ToInt32(reader["house_num"]),
                                IsBehindPayment = Convert.ToBoolean(reader["IsBehindPayment"]),
                                BehindPayment = Convert.ToDecimal(reader["BehindPayment"]) // Assuming decimal type
>>>>>>> 6ce2ae6977f3e0e0e4cfbc6ef865dda0697aa457
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
<<<<<<< HEAD
            string connectionString = "Server=localhost;Database=auth;User ID=root;Password=;Port=3306;";
            string query = "UPDATE aspnetusers SET FizetettE_havi = @FizetettE_havi, Fizetesi_elmaradas = @Fizetesi_elmaradas WHERE FullName = @FullName";
=======
            string connectionString = "Server=localhost;Database=project;User ID=root;Password=;Port=3306;";
            string query = "UPDATE user_personal SET IsBehindPayment = @IsBehindPayment, BehindPayment = @BehindPayment WHERE Lastname = @Lastname AND Firstname = @Firstname";
>>>>>>> 6ce2ae6977f3e0e0e4cfbc6ef865dda0697aa457

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
<<<<<<< HEAD
                command.Parameters.AddWithValue("@FizetettE_havi", person.FizetettE_havi);
                command.Parameters.AddWithValue("@Fizetesi_elmaradas", person.Fizetesi_elmaradas);
                command.Parameters.AddWithValue("@FullName", person.FullName);

=======
                command.Parameters.AddWithValue("@IsBehindPayment", person.IsBehindPayment);
                command.Parameters.AddWithValue("@BehindPayment", person.BehindPayment);
                command.Parameters.AddWithValue("@Lastname", person.Lastname);
                command.Parameters.AddWithValue("@Firstname", person.Firstname);
>>>>>>> 6ce2ae6977f3e0e0e4cfbc6ef865dda0697aa457

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

<<<<<<< HEAD
        // Event to prevent auto-generation of columns for FizetettE_havi and Fizetesi_elmaradas
        private void DataGridUsers_AutoGeneratingColumn(object sender, DataGridAutoGeneratingColumnEventArgs e)
        {
            if (e.PropertyName == "FizetettE_havi" || e.PropertyName == "Fizetesi_elmaradas" || e.PropertyName == "DateOfBirth")
=======
        // Event to prevent auto-generation of columns for IsBehindPayment and BehindPayment
        private void DataGridUsers_AutoGeneratingColumn(object sender, DataGridAutoGeneratingColumnEventArgs e)
        {
            if (e.PropertyName == "IsBehindPayment" || e.PropertyName == "BehindPayment")
>>>>>>> 6ce2ae6977f3e0e0e4cfbc6ef865dda0697aa457
            {
                e.Cancel = true; // Prevent auto-generation of these columns
            }
        }

<<<<<<< HEAD

        // Filter ComboBox selection change event
        private void FilterComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            string selectedLakasSzovNev = FilterComboBox.SelectedItem as string;

            if (selectedLakasSzovNev == "Mind")
=======
        // Filter ComboBox selection change event
        private void FilterComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            string selectedCity = FilterComboBox.SelectedItem as string;

            if (selectedCity == "Mind")
>>>>>>> 6ce2ae6977f3e0e0e4cfbc6ef865dda0697aa457
            {
                DataGridUsers.ItemsSource = AllData;
            }
            else
            {
<<<<<<< HEAD
                var filteredData = AllData.Where(person => person.LakasSzovNev == selectedLakasSzovNev).ToList();
=======
                var filteredData = AllData.Where(person => person.City == selectedCity).ToList();
>>>>>>> 6ce2ae6977f3e0e0e4cfbc6ef865dda0697aa457
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
<<<<<<< HEAD
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


=======
            public string Firstname { get; set; }
            public string Lastname { get; set; }
            public DateTime B_date { get; set; }
            public string City { get; set; }
            public string Phone_num { get; set; }
            public int Zip { get; set; }
            public string Street { get; set; }
            public int house_num { get; set; }
            public int Floor { get; set; }
            public int Door { get; set; }
            public bool IsBehindPayment { get; set; }
            public decimal BehindPayment { get; set; }
        }
>>>>>>> 6ce2ae6977f3e0e0e4cfbc6ef865dda0697aa457
    }
}
