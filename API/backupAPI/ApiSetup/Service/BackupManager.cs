using TrackerService.Service.Interface;

namespace TrackerService.Service
{
    public class BackupManager
    {
        private readonly IDatabaseBackupStrategy _backupStrategy;

        public BackupManager(IDatabaseBackupStrategy backupStrategy)
        {
            _backupStrategy = backupStrategy;
        }

        public async Task<string> RunBackupAsync()
        {
            return await _backupStrategy.PerformBackupAsync();
        }
        public bool CheckConnection()
        {
            return _backupStrategy.TestConnection();
        }
    }
}
