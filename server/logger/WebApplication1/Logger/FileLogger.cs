using WebApplication1.Models;
using System;
using System.IO;

namespace WebApplication1.Logging
{
    public class FileLogger
    {
        private readonly string _path;

        public FileLogger()
        {
            _path = Path.Combine(Directory.GetCurrentDirectory(), "logs.txt");
        }

        public void Log(LogEntryDto entry)
        {
            if (entry == null) return;

            string line = $"{DateTime.Now:yyyy-MM-dd HH:mm:ss} | User: {entry.UserName} | action : Logging |RoleType: {entry.RoleType} | IP: {entry.IpAddress} | Details: {entry.Name}";

            File.AppendAllText(_path, line + Environment.NewLine);
        }
    }
}
