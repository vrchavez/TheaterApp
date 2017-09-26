using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests
{
    public class PersonUpdateRequest : PersonAddRequest
    {
        public int Id { get; set; }
    }
}
