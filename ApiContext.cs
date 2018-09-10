using Microsoft.EntityFrameworkCore;
using RCheetah.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RCheetah
{
    public class ApiContext: DbContext
    {
        public DbSet<Message> messages { get; set; }
        public ApiContext(DbContextOptions<ApiContext> options) :base(options)
        {

        }
    }
}
