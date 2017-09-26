using Models.Domain;
using Models.Requests;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class PersonService
    {
        public List<Person> GetAll()
        {
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ViaConnection"].ConnectionString))
            {
                con.Open(); //Open Connection Here
                var cmd = con.CreateCommand(); //cmd creates a command
                cmd.CommandText = "dbo.Person_SelectAll"; //Sets the name of the stored procedure
                cmd.CommandType = CommandType.StoredProcedure; //Sets what the command type is (Which is a stored procedure)

                using (var reader = cmd.ExecuteReader())
                {
                    var results = new List<Person>();

                    while (reader.Read())
                    {
                        results.Add(new Person
                        {
                            Id = (int)reader["Id"],
                            FullName = (string)reader["FullName"],
                            Address = (string)reader["Address"],
                            Phone = (string)reader["Phone"]

                        });
                    }
                    return results;
                }
            }
        }

        public void Put(PersonUpdateRequest model)
        {
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ViaConnection"].ConnectionString))
            {
                con.Open(); //Open Connection Here
                SqlCommand cmd = con.CreateCommand();

                cmd.CommandText = "dbo.Person_Update"; //Sets the name of the stored procedure
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", model.Id);  //HERE WE ADD ID FROM UPDATE REQUEST
                cmd.Parameters.AddWithValue("@FullName", model.FullName);
                cmd.Parameters.AddWithValue("@Address", model.Address);
                cmd.Parameters.AddWithValue("@Phone", model.Phone);

                // 5. Call ExecuteNonQuery to send command
                cmd.ExecuteNonQuery();
            }
        }

        public void Post(PersonAddRequest model)
        {
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ViaConnection"].ConnectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();

                cmd.CommandText = "dbo.Person_Insert";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@FullName", model.FullName);
                cmd.Parameters.AddWithValue("@Address", model.Address);
                cmd.Parameters.AddWithValue("@Phone", model.Phone);

                cmd.ExecuteNonQuery();
            }
        }

        public void Delete(int Id)
        {
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ViaConnection"].ConnectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();

                cmd.CommandText = "dbo.Person_Delete";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);

                cmd.ExecuteNonQuery();
            }

        }

        public Person GetById(int Id)
        {
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ViaConnection"].ConnectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();

                cmd.CommandText = "dbo.Person_SelectById";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);

                Person newPerson = new Person();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var position = 0;
                        Person result = new Person();
                        result.Id = reader.GetInt32(position++);
                        result.FullName = reader.GetString(position++);
                        result.Address = reader.GetString(position++);
                        result.Phone = reader.GetString(position++);

                        newPerson = result;
                    }
                }
                return newPerson;
            }
        }
    }
}
