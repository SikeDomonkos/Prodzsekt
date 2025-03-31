using System;
using System.Collections.Generic;

namespace AuthApi.Models;

public partial class Poll
{
    public string Id { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string PosterId { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime EndingAt { get; set; }

    public int No { get; set; }

    public int Yes { get; set; }

    public bool IsVoted { get; set; }
}
