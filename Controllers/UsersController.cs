using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RCheetah.Data;
using RCheetah.Dtos;

namespace RCheetah.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(usersToReturn);
        }

        [HttpGet("{userName}")]
        public async Task<IActionResult> GetUser (string userName)
        {
            var user = await _repo.GetUser(userName);
            if (user!= null)
            {
                var userToReturn = _mapper.Map<UserForDetailedDto>(user);
                return Ok(userToReturn);

            }
            return NotFound();

        }

        [HttpPut("{userName}")]
        public async Task<IActionResult> UpdateUser(string userName, UserForUpdateDto userForUpdateDto)
        {
            //I defined 3 claims in auth controller
            if (userName != User.FindFirst(ClaimTypes.Name).Value)
            {
                return Unauthorized();
            }

            var userFromRepo = await _repo.GetUser(userName);
            _mapper.Map(userForUpdateDto, userFromRepo);
            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {userName} failed on save");

        }

    }
}