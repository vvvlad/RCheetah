using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RCheetah.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FallbackController : ControllerBase
    {
        public IActionResult Index()
        {
            //TODO - change wwwroot to any other directory I use
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "dist","index.html"), "text/HTML");
        }
    }
}