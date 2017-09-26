using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Scraper
{
    class Program
    {
        static void Main(string[] args)
        {
            var webClient = new WebClient();
            var html = webClient.DownloadString("https://www.yelp.com/search?find_desc=theatres&find_loc=Los+Angeles,+CA");

            var htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(html);

            var nodes =
                htmlDocument
                .DocumentNode
                .Descendants()
                .Where(node => 
                node.Attributes["data-analytics-label"] != null && node.Attributes["data-analytics-label"].Value.Contains("biz-name") || node.Element("address") != null);
            int position = 1;
            var container = "";

            foreach ( var node in nodes)
            {
                if (position %2 != 0)
                {
                    container = node.InnerText;
                    position++;
                }
                else if (position % 2 == 0)
                {
                    var theater = Regex.Replace(node.InnerText.ToString(), @"\s", "");
                    if (theater.Contains("Phonenumber"))
                    {

                        var anotherstring = theater.Split(new string[] { "Phonenumber" }, StringSplitOptions.None);
                        using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ViaConnection"].ConnectionString))
                        {
                            con.Open();
                            SqlCommand cmd = con.CreateCommand();

                            cmd.CommandText = "dbo.Person_Insert";
                            cmd.CommandType = CommandType.StoredProcedure;

                            cmd.Parameters.AddWithValue("@FullName", container.ToString());
                            cmd.Parameters.AddWithValue("@Address", anotherstring[0]);
                            cmd.Parameters.AddWithValue("@Phone", anotherstring[1]);


                            cmd.ExecuteNonQuery();
                        }
                    }
                    else
                    {
                        container = "";
                        position++;
                    }
                    container = "";
                    position++;
                }
            }
            
        }
    }
}
