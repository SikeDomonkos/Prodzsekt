using AuthApi.Models.Dtos;

namespace AuthApi.Services.IService
{
    public interface IAuth
    {
        Task<object> Login(LoginRequestDto loginRequestDto);
        Task<object> Register(RegisterRequestDto registerRequestDto);
        Task<object> AssignRole(AssignRoleRequestDto assignRoleRequestDto);
    }
}
