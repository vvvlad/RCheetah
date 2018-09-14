﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RCheetah.Helpers
{
    //Class for creating extension methods
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static int CalculateAge(this DateTime birthDate)
        {
            var age = DateTime.Today.Year - birthDate.Year;
            if (birthDate.AddYears(age) > DateTime.Today) age--;
            return age;
        }
    }

    
}
