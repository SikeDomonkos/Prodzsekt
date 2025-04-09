using System;
using System.Globalization;
using System.Windows.Data;
using System.Windows.Media;

namespace ProjektWPF
{
    // Ez az osztály egy szavazás eredményei alapján tér vissza egy színnel.
    // Ha az "igen" szavazatok többségben vannak → zöld szín,
    // ha a "nem" szavazatok vannak többségben → pirosas szín,
    // döntetlen esetén → semleges szürke szín.
    public class PollColorConverter : IMultiValueConverter
    {
        public object Convert(object[] values, Type targetType, object parameter, CultureInfo culture)
        {
            if (values.Length < 2 || !(values[0] is int yesVotes) || !(values[1] is int noVotes))
                return Brushes.LightGray; 
            if (yesVotes > noVotes)
                return Brushes.LightGreen;

            if (noVotes > yesVotes)
                return Brushes.LightCoral; 

            return Brushes.LightGray;
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
