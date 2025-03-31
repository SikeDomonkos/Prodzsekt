using AuthApi.Models;
using AuthApi.Models.Dtos;
using AuthApi.Services.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuthApi.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuth auth;

        public AuthController(IAuth auth)
        {
            this.auth = auth;
        }

        [HttpGet("profile")]
        public async Task<ActionResult> Profile(string id)
        {
            using (var context = new AuthContext())
            {
                Aspnetuser loggedinuser = context.Aspnetusers.FirstOrDefault(x=> x.Id == id);

                if (loggedinuser != null)
                {
                    return Ok(loggedinuser);
                }
                return NotFound();  
            }
        }

        [HttpGet("UserWithRole")]
        public async Task<ActionResult> GetUserWithRole(string id)
        {
            using (var context = new AuthContext())
            {
                var loggedinuser = await context.Aspnetusers
            .Where(x => x.Id == id)
            .Include(x => x.Roles) 
            .FirstOrDefaultAsync(x => x.Id == id);
            
                if (loggedinuser != null)
                {
                    var userProfile = new
                    {
                        userId = loggedinuser.Id,
                        username = loggedinuser.UserName,
                        roles = loggedinuser.Roles.Select(r => r.Name).ToList()
                    };
                    return Ok(userProfile);
                }
                return NotFound();
            }
        }
        
        [HttpPut("personal")]
        public async Task<ActionResult> Personal(string id, PersonalDto personalDto)
        {
            using (var context = new AuthContext())
            {
                Aspnetuser loggedinuser = context.Aspnetusers.FirstOrDefault(x=>x.Id == id);
                if (loggedinuser != null)
                {
                    loggedinuser.PhoneNumber = personalDto.PhoneNumber;
                    loggedinuser.LakasSzovNev = personalDto.LakasSzovNev;
                    loggedinuser.DateOfBirth = personalDto.DateOfBirth.Date;
                    loggedinuser.Varos = personalDto.Varos;
                    context.SaveChanges();
                    return Ok("Adatok frissítve!");
                }
                return NotFound();
            }
        }

        [HttpPut("elmaradas_kezeles")]
        public async Task<ActionResult> elmaradasok(string id, ElmaradasFelvitelDto elmaradasFelvitelDto)
        {
            using (var context = new AuthContext())
            {
                Aspnetuser loggedinuser = context.Aspnetusers.FirstOrDefault(x => x.Id == id);
                if (loggedinuser != null)
                {
                    loggedinuser.FizetesiElmaradas = elmaradasFelvitelDto.FizetesiElmaradas;
                    loggedinuser.FizetettEHavi = elmaradasFelvitelDto.FizetettEHavi;
                    context.Add(loggedinuser);
                    context.SaveChanges();
                    return Ok("Elmaradás frissítve!");
                }
                return NotFound();
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> LoginPost(LoginRequestDto loginRequestDto)
        {
            var log = await auth.Login(loginRequestDto);

            if (log != null)
            {
                return Ok(log);
            }

            return BadRequest();

        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterPost(RegisterRequestDto registerRequestDto)
        {
            var user = await auth.Register(registerRequestDto);

            if (user != null)
            {
                return Ok(user);
            }

            return BadRequest();

        }

        [HttpPost("assignRole")]
        public async Task<ActionResult> AssignRole(AssignRoleRequestDto assignRoleRequestDto)
        {
            var user = await auth.AssignRole(assignRoleRequestDto);

            if (user != null)
            {
                return StatusCode(201, user);
            }

            return BadRequest(user);
        }

    }
}
