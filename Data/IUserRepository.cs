using RCheetah.Helpers;
using RCheetah.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RCheetah.Data
{
    public interface IUserRepository
    {
        //Generic so I can update Photos as well
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(string userName);
       
    }
}
