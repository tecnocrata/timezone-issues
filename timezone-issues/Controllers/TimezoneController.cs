using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace timezone_issues.Controllers
{
    public class Dates
    {
        public string date1 { get; set; }
        public string date2 { get; set; }
    }

    [Route("[controller]")]
    public class TimezoneController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "America/Denver", "America/New_York" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Dates dates)
        {
            //Arriving date in string
            Console.WriteLine("date1 "+dates.date1);
            Console.WriteLine("date2 "+ dates.date2);
            //Converting it to C# DateTime
            DateTime d1 = DateTime.Parse(dates.date1, null, System.Globalization.DateTimeStyles.RoundtripKind);
            DateTime d2 = DateTime.Parse(dates.date2, null, System.Globalization.DateTimeStyles.RoundtripKind);
            Console.WriteLine("d1 " + d1);
            Console.WriteLine("d2 " + d2);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
