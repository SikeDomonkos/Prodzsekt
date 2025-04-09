using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjektWPF
{
    // Osztály, amely egy felhasználó által létrehozott bejegyzést reprezentál.

    public class Post
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string PosterId { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
        public bool IsAccepted { get; set; }
        public string AcceptorId { get; set; }
        public string Location { get; set; }
        public string Acceptor { get; set; }
        public string Poster { get; set; }
        public string posterFullName { get; set; }
    }


}
