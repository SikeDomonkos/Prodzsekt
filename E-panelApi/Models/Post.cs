using System;
using System.Collections.Generic;

namespace E_panelApi.Models;

public partial class Post
{
    public string Id { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string PosterId { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public bool IsAccepted { get; set; }

    public string AcceptorId { get; set; } = null!;

    public string Location { get; set; } = null!;

    public virtual Aspnetuser Acceptor { get; set; } = null!;

    public virtual Aspnetuser Poster { get; set; } = null!;
}
