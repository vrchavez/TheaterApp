using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests
{
    public class CellPhoneUpdateRequest : CellPhoneAddRequest
    {
        public int Id { get; set; }
    }
}
