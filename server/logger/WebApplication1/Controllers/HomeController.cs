using Microsoft.AspNetCore.Mvc;
using WebApplication1.Logging;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LogsController : ControllerBase
    {
        private readonly FileLogger _logger;

        public LogsController(FileLogger logger)
        {
            _logger = logger;
        }

        // POST: /logs
        [HttpPost]
        public IActionResult Post([FromBody] LogEntryDto logEntry)
        {
            if (logEntry == null)
                return BadRequest("Log entry cannot be null");

            _logger.Log(logEntry);
            return Ok("Log saved successfully");
        }

        
    }
}
