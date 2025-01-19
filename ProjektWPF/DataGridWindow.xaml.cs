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

                // Populate FilterComboBox with unique 'City' values
                FilterComboBox.ItemsSource = AllData
                    .Select(person => person.City)
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
            string connectionString = "Server=localhost;Database=project;User ID=root;Password=;Port=3306;";
            string query = "SELECT Lastname, Firstname, B_date, Phone_num, City, Zip, Street, house_num, Floor, Door, IsBehindPayment, BehindPayment FROM user_personal";

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
            string connectionString = "Server=localhost;Database=project;User ID=root;Password=;Port=3306;";
            string query = "UPDATE user_personal SET IsBehindPayment = @IsBehindPayment, BehindPayment = @BehindPayment WHERE Lastname = @Lastname AND Firstname = @Firstname";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@IsBehindPayment", person.IsBehindPayment);
                command.Parameters.AddWithValue("@BehindPayment", person.BehindPayment);
                command.Parameters.AddWithValue("@Lastname", person.Lastname);
                command.Parameters.AddWithValue("@Firstname", person.Firstname);

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

        // Event to prevent auto-generation of columns for IsBehindPayment and BehindPayment
        private void DataGridUsers_AutoGeneratingColumn(object sender, DataGridAutoGeneratingColumnEventArgs e)
        {
            if (e.PropertyName == "IsBehindPayment" || e.PropertyName == "BehindPayment")
            {
                e.Cancel = true; // Prevent auto-generation of these columns
            }
        }

        // Filter ComboBox selection change event
        private void FilterComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            string selectedCity = FilterComboBox.SelectedItem as string;

            if (selectedCity == "Mind")
            {
                DataGridUsers.ItemsSource = AllData;
            }
            else
            {
                var filteredData = AllData.Where(person => person.City == selectedCity).ToList();
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
    }
}
