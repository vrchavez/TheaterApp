using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests
{
    public class PersonAddRequest
    {
        public string FullName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
    }
}
