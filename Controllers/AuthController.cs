using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
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
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IMapper mapper, IConfiguration config)
        {
            _repo = repo;
            _mapper = mapper;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto user)
        {
            //TODO validate request 

            user.Email = user.Email.ToLower();
            if(await _repo.UserEmailExists(user.Email))
            {
                return BadRequest("Email already exists");
            }

            user.UserName = user.UserName.ToLower();
            if (await _repo.UserNameExists(user.UserName))
            {
                return BadRequest("User Name already exists");
            }


            var userToCreate = _mapper.Map<User>(user);

            var createdUser = await _repo.Register(userToCreate, user.Password);

            var userToReturn = _mapper.Map<UserForDetailedDto>(createdUser);
            return CreatedAtRoute("GetUser", new { controller = "Users", userName = createdUser.UserName }, userToReturn);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login (UserForLoginDto user)
        {
            var userFromRepo = await _repo.Login(user.Email.ToLower(), user.Password);

            if(userFromRepo==null)
            {
                return Unauthorized();
            }
            //TODO - better understand what is claim and which types of claims there are
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                // user needs to be there, without it fails
                new Claim(ClaimTypes.Name, userFromRepo.UserName.ToString()),
                new Claim(ClaimTypes.Email, userFromRepo.Email.ToString())
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