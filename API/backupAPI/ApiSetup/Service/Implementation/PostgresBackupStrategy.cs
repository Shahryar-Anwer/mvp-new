using TrackerService.Service.Interface;
using Microsoft.Extensions.Logging;
using Npgsql;
using System.Diagnostics;

namespace TrackerService.Service.Implementation
{
    public class PostgresBackupStrategy : IDatabaseBackupStrategy
    {
        private readonly string _backupDirectory;
        private readonly string _postgresUser;
        private readonly string _postgresPassword;
        private readonly string _postgresHost;
        private readonly string _postgresDatabase;

        public PostgresBackupStrategy(string backupDirectory, string postgresUser, string postgresPassword, string postgresHost, string postgresDatabase)
        {
            _backupDirectory = backupDirectory;
            _postgresUser = postgresUser;
            _postgresPassword = postgresPassword;
            _postgresHost = postgresHost;
            _postgresDatabase = postgresDatabase;

            Directory.CreateDirectory(_backupDirectory);
        }
        // Check PostgreSQL Connection
        public bool TestConnection()
        {
            string connectionString = $"Host={_postgresHost};Username={_postgresUser};Password={_postgresPassword};Database={_postgresDatabase}";

            try
            {
                using (var connection = new NpgsqlConnection(connectionString))
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

        // Perform PostgreSQL Backup
        public async Task<string> PerformBackupAsync()
        {
            string backupFileName = Path.Combine(_backupDirectory, $"{_postgresDatabase}_backup_{DateTime.Now:yyyyMMddHHmmss}.sql");

            string pgDumpPath = "C:\\Program Files\\PostgreSQL\\13\\bin\\pg_dump.exe"; // Ensure pg_dump is in the PATH or provide full path
            var arguments = $"-h {_postgresHost} -U {_postgresUser} -d {_postgresDatabase} -F c -f \"{backupFileName}\"";

            var startInfo = new ProcessStartInfo
            {
                FileName = pgDumpPath,
                Arguments = arguments,
                RedirectStandardError = true,
                RedirectStandardInput = true,
                UseShellExecute = false,
                CreateNoWindow = true,
            };
            startInfo.EnvironmentVariables["PGPASSWORD"] = _postgresPassword;
            try
            {
                using var process = new Process { StartInfo = startInfo };
                process.Start();

                // Provide password via standard input (for security, consider other methods like environment variables)
                using (var writer = process.StandardInput)
                {
                    await writer.WriteLineAsync(_postgresPassword);
                }

                string errorOutput = await process.StandardError.ReadToEndAsync();
                process.WaitForExit();

                if (process.ExitCode != 0)
                {
                    throw new Exception($"pg_dump failed with error: {errorOutput}");
                }

                return backupFileName;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during PostgreSQL backup: {ex.Message}");
                throw;
            }
        }

        public void RestorePostgresDatabase(string backupFilePath, string postgresUser, string postgresPassword, string postgresHost, string postgresDatabase)
        {
            string pgRestorePath = "C:\\Program Files\\PostgreSQL\\13\\bin\\pg_restore.exe"; // Ensure pg_restore is available

            var startInfo = new ProcessStartInfo
            {
                FileName = pgRestorePath,
                Arguments = $"-h {postgresHost} -U {postgresUser} -d {postgresDatabase} -1 \"{backupFilePath}\"",
                RedirectStandardError = true,
                RedirectStandardInput = true,
                UseShellExecute = false,
                CreateNoWindow = true,
            };
            startInfo.EnvironmentVariables["PGPASSWORD"] = postgresPassword;

            try
            {
                using var process = new Process { StartInfo = startInfo };
                process.Start();

                string errorOutput = process.StandardError.ReadToEnd();
                process.WaitForExit();

                if (process.ExitCode != 0)
                {
                    throw new Exception($"pg_restore failed with error: {errorOutput}");
                }

                Console.WriteLine("Database restored successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during restore: {ex.Message}");
                throw;
            }
        }
    }
}
