using System.Diagnostics;
using TrackerService.Service.Interface;

namespace ApiSetupProject.Service.Implementation
{
    public class SqlServerBackupStrategy : IDatabaseBackupStrategy
    {
        private readonly string _backupDirectory;
        private readonly string _sqlUser;
        private readonly string _sqlPassword;
        private readonly string _sqlHost;
        private readonly string _sqlDatabase;

        public SqlServerBackupStrategy(string backupDirectory, string sqlUser, string sqlPassword, string sqlHost, string sqlDatabase)
        {
            _backupDirectory = backupDirectory;
            _sqlUser = sqlUser;
            _sqlPassword = sqlPassword;
            _sqlHost = sqlHost;
            _sqlDatabase = sqlDatabase;

            Directory.CreateDirectory(_backupDirectory);
        }

        // Check SQL Server Connection
        public bool TestConnection()
        {
            string connectionString = $"Server={_sqlHost};Database={_sqlDatabase};User Id={_sqlUser};Password={_sqlPassword};";

            try
            {
                using (var connection = new System.Data.SqlClient.SqlConnection(connectionString))
                {
                    connection.Open();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        // Perform SQL Server Backup
        public async Task<string> PerformBackupAsync()
        {
            string backupFileName = Path.Combine(_backupDirectory, $"{_sqlDatabase}_backup_{DateTime.Now:yyyyMMddHHmmss}.bak");

            string sqlcmdPath = "sqlcmd"; // Ensure sqlcmd is in the PATH or provide full path
            var backupQuery = $"BACKUP DATABASE [{_sqlDatabase}] TO DISK = '{backupFileName}' WITH FORMAT, INIT;";
            var arguments = $"-S {_sqlHost} -U {_sqlUser} -P {_sqlPassword} -Q \"{backupQuery}\"";

            var startInfo = new ProcessStartInfo
            {
                FileName = sqlcmdPath,
                Arguments = arguments,
                RedirectStandardError = true,
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true,
            };

            try
            {
                using var process = new Process { StartInfo = startInfo };
                process.Start();

                string output = await process.StandardOutput.ReadToEndAsync();
                string errorOutput = await process.StandardError.ReadToEndAsync();
                process.WaitForExit();

                if (process.ExitCode != 0)
                {
                    throw new Exception($"sqlcmd failed with error: {errorOutput}");
                }

                return backupFileName;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during SQL Server backup: {ex.Message}");
                throw;
            }
        }
    }
}
