using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RCheetah.Data;
using RCheetah.Dtos;
using RCheetah.Models;

namespace RCheetah.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto user)
        {
            //TODO validate request 

            user.UserName = user.UserName.ToLower();
            if(await _repo.UserExists(user.UserName))
            {
                return BadRequest("username already exists");
            }

            var userToCreate = new User
            {
                UserName = user.UserName
            };

            var createdUser = await _repo.Register(userToCreate, user.Password);
            return StatusCode(201);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login (UserForLoginDto user)
        {
            var userFromRepo = await _repo.Login(user.UserName.ToLower(), user.Password);

            if(userFromRepo==null)
            {
                return Unauthorized();
            }
            //TODO - better understand what is claim and which types of claims there are
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.UserName.ToString())
            };
            //Signing key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            //encrypting the key
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            //start token creation
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }
















        //public class JwtPacket
        //{
        //    public string Token { get; set; }
        //    public string FirstName { get; set; }
        //}
        //[HttpPost("register")]
        //public JwtPacket Register([FromBody]User user)
        //{
        //    //raw token
        //    var jwt = new JwtSecurityToken();
        //    //encoded token as a string
        //    var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
        //    //convert it to an object so can send it as json
        //    return new JwtPacket() { Token = encodedJwt };
        //}



        //JwtPacket CreateJwtPacket(User user)
        //{
        //    var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret key"));
        //    var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
        //    //TODO - need to undersatand what claim is for, but generally it encodes user id with token
        //    var claims = new Claim[]
        //    {
        //        new Claim(JwtRegisteredClaimNames.Sub, user.Id)
        //    };
        //    var jwt = new JwtSecurityToken(claims: claims, signingCredentials: signingCredentials);
        //    //encoded token as a string
        //    var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
        //    //convert it to an object so can send it as json
        //    return new JwtPacket() { Token = encodedJwt , FirstName = user.FirstName};
        //}
    }
}