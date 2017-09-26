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
    public class CellPhoneService
    {
        public List<CellPhone> GetAll()
        {
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ViaConnection"].ConnectionString))
            {
                con.Open(); //Open Connection Here
                var cmd = con.CreateCommand(); //cmd creates a command
                cmd.CommandText = "dbo.iPhone_SelectAll"; //Sets the name of the stored procedure
                cmd.CommandType = CommandType.StoredProcedure; //Sets what the command type is (Which is a stored procedure)

                using (var reader = cmd.ExecuteReader())
                {
                    var results = new List<CellPhone>();

                    while (reader.Read())
                    {
                        results.Add(new CellPhone
                        {
                            Id = (int)reader["Id"],
                            Model = (string)reader["Model"],
                            Price = (int)reader["Price"]

                        });
                    }
                    return results;
                }
            }
        }

        public void Put(CellPhoneUpdateRequest model)
        {
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ViaConnection"].ConnectionString))
            {
                con.Open(); //Open Connection Here
                SqlCommand cmd = con.CreateCommand();

                cmd.CommandText = "dbo.iPhone_Update"; //Sets the name of the stored procedure
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", model.Id);  //HERE WE ADD ID FROM UPDATE REQUEST
                cmd.Parameters.AddWithValue("@Model", model.Model);
                cmd.Parameters.AddWithValue("@Price", model.Price);

                // 5. Call ExecuteNonQuery to send command
                cmd.ExecuteNonQuery();
            }
        }

        public void Post(CellPhoneAddRequest model)
        {
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ViaConnection"].ConnectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();

                cmd.CommandText = "dbo.iPhone_Insert";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Model", model.Model);
                cmd.Parameters.AddWithValue("@Price", model.Price);

                cmd.ExecuteNonQuery();
            }
        }

        public void Delete(int Id)
        {
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ViaConnection"].ConnectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();

                cmd.CommandText = "dbo.iPhone_Delete";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);

                cmd.ExecuteNonQuery();
            }

        }

        public CellPhone GetById(int Id)
        {
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ViaConnection"].ConnectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();

                cmd.CommandText = "dbo.iPhone_SelectById";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);

                CellPhone newCell = new CellPhone();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var position = 0;
                        CellPhone result = new CellPhone();
                        result.Id = reader.GetInt32(position++);
                        result.Model = reader.GetString(position++);
                        result.Price = reader.GetInt32(position++);

                        newCell = result;
                    }
                }
                return newCell;
            }
        }
    }
}
