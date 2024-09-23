using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace xprox_calendar.Models
{
    public class StoreProcedureParams : Controller
    {
        public string Procedure { get; set; }
        public Dictionary<string, object> Parameters { get; set; }
    }
}
