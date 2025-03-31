namespace E_panelApi.Dtos
{
    //Szavazasok
    public record CreatePollDto(string Title, string Description, DateTime CreatedAt, DateTime EndingAt, string PosterId);
    public record UpdatePollDto(string Title, string Description, DateTime CreatedAt);
    
    //Segisegkeresek
    public record CreatePostDto(string Title, string Description, string Location, DateTime CreatedAt, string PosterId);
    public record UpdatePostDto(string Title, string Description, string Location, DateTime UpdatedAt, bool IsAccepted, string AcceptorId);
}
