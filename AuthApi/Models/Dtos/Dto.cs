namespace AuthApi.Models.Dtos
{
    public record LoginRequestDto(string UserName, string Password);
    public record PersonalDto(string PhoneNumber, string LakasSzovNev, DateTime DateOfBirth, string Varos);
    public record ElmaradasFelvitelDto(bool FizetettEHavi, int FizetesiElmaradas);
    public record RegisterRequestDto(string UserName, string Password, string Email, string FullName);
    public record AssignRoleRequestDto(string UserName, string RoleName); //Roles:
                                                                          //Developer(Minden),
                                                                          //Admin(Sajat lakasszovetkezeten belul minden, nem lehet role-t adni)
}
