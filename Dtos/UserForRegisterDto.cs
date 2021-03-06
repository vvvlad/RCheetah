﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

// DTO - data tranfer object - is an object that carries data between processes
namespace RCheetah.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 6, ErrorMessage ="Password needs to be at least 6 characters")]
        public string Password { get; set; }

        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}
