using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace RCheetah.Dal
{
    public class SqlDal
    {
        private readonly IConfiguration _configuration;
        public SqlDal(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string TestSql()
        {
            SqlConnectionStringBuilder con = new SqlConnectionStringBuilder();
            var connString = _configuration["ConnectionStrings:DefaultConnection"];

            string queryString = "SELECT test FROM [dbo].[Table] WHERE id=1";

            using (SqlConnection connection = new SqlConnection(connString))
            using (SqlCommand command = connection.CreateCommand())
            {
                command.CommandText = queryString;
                connection.Open();

                using(SqlDataReader reader = command.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        var x = reader["test"].ToString();
                        return x;
                    }
                }
            }
            return string.Empty;
        }
    }
}
