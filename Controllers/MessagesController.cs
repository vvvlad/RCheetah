using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RCheetah.Models;

namespace RCheetah.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        static List<Message> messages = new List<Message>
        {
            new Message
                {
                    Owner="John",
                    Text="Hello"
                },
                new Message
                {
                    Owner="Tim",
                    Text="World"
                }
        };
        public IEnumerable<Message> Get()
        {
            return messages;
        }

        [HttpGet("{name}")]
        public IEnumerable<Message> Get(string name)
        {
            return messages.FindAll(x=>x.Owner.ToLower().Equals(name.ToLower()));
        }
        [HttpPost]
        public void Post([FromBody]Message message)
        {

        }
    }
}