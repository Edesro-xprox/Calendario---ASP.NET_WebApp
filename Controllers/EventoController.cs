using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls.WebParts;
using xprox_calendar.Models;

namespace xprox_calendar.Controllers
{
    public class EventoController : Controller
    {
        private string conexionBD = System.Configuration.ConfigurationManager.ConnectionStrings["calendar_xprox"].ConnectionString;
        public JsonResult executeProceduresEvent(StoreProcedureParams model)
        {
            string rpta = "";
            try
            {
                using (SqlConnection bd = new SqlConnection(conexionBD))
                {
                    bd.Open();

                    using (SqlCommand cmd = new SqlCommand(model.Procedure, bd))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        if (model.Parameters != null)
                        {
                            foreach(var item in model.Parameters)
                            {
                                cmd.Parameters.AddWithValue(item.Key, item.Value);
                            }
                        }

                        var result = cmd.ExecuteScalar();
                        rpta = result.ToString();

                        return Json(new { success = rpta == "OK" ? true : false, message = rpta });
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }
}
