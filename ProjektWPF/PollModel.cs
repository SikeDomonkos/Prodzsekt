using System;

namespace ProjektWPF
{
    public class Poll
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string PosterId { get; set; }
        public DateTime CreatedAt { get; set; }
        public int No { get; set; }
        public int Yes { get; set; }
        public bool IsVoted { get; set; }
    }
}
