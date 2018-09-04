using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RCheetah.Dal;

namespace RCheetah.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly IConfiguration configuration;

        public SampleDataController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {

            SqlDal sql = new SqlDal(configuration);
            var testValue = sql.TestSql();

            //var exampleValueFromConfig = configuration["Greeting"];
            var rng = new Random();

            var toReturn = Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });

            var testW = new WeatherForecast { DateFormatted = DateTime.Now.ToString("d"), TemperatureC = 0, Summary = testValue };
            toReturn =toReturn.ToList().Append(testW);
            
            return toReturn;
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
