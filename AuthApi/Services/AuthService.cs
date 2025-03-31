using AuthApi.Models;
using AuthApi.Models.Dtos;
using AuthApi.Services.IService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AuthApi.Services
{
    public class AuthService : IAuth
    {
        private readonly AppDbContext _appDbContext;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        private readonly ITokenGenerator jwtTokenGenerator;

        public AuthService(AppDbContext appDbContext, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ITokenGenerator jwtTokenGenerator)
        {
            _appDbContext = appDbContext;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<object> AssignRole(AssignRoleRequestDto assignRoleRequestDto)
        {
            var user = await _appDbContext.applicationUsers.FirstOrDefaultAsync(usr => usr.NormalizedUserName == assignRoleRequestDto.UserName.ToUpper());

            if (user != null)
            {
                if (!roleManager.RoleExistsAsync(assignRoleRequestDto.RoleName).GetAwaiter().GetResult())
                {
                    roleManager.CreateAsync(new IdentityRole(assignRoleRequestDto.RoleName)).GetAwaiter().GetResult();
                }

                await userManager.AddToRoleAsync(user, assignRoleRequestDto.RoleName);

                return new { result = new { usrName = user.UserName, email = user.Email }, message = "Sikeres hozzárendelés." };
            }

            return new { result = "", message = "Sikertelen hozzárendelés." };
        }

        public async Task<object> Login(LoginRequestDto loginRequestDto)
        {
            var user = await _appDbContext.applicationUsers.
                FirstOrDefaultAsync(user => user.UserName.ToLower() == loginRequestDto.UserName.ToLower());

            bool isValid = await userManager.CheckPasswordAsync(user, loginRequestDto.Password);

            if (user == null || isValid == false)
            {
                return new { result = "", Token = "", Id = "" };
            }

            var roles = await userManager.GetRolesAsync(user);
            var token = jwtTokenGenerator.GenerateToken(user, roles);

            return new { result = loginRequestDto, Token = token, Id = user.Id};

        }

        public async Task<object> Register(RegisterRequestDto registerRequestDto)
        {
            ApplicationUser user = new()
            {
                UserName = registerRequestDto.UserName,
                NormalizedUserName = registerRequestDto.UserName.ToUpper(),
                FullName = registerRequestDto.FullName,
                Email = registerRequestDto.Email

            };

            var result = await userManager.CreateAsync(user, registerRequestDto.Password);

            if (result.Succeeded)
            {
                var userToReturn = await _appDbContext.applicationUsers.FirstOrDefaultAsync(user => user.UserName == registerRequestDto.UserName);


                var UserResponse = new
                {
                    id = userToReturn.Id,
                    email = userToReturn.Email,
                    userName = userToReturn.UserName,
                    fullName = userToReturn.FullName,
                };

                return new { result = UserResponse, message = "Sikeres regisztráció." };
            }
            return result.Errors.FirstOrDefault().Description;
        }
    }
}
