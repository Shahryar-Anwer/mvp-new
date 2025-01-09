namespace TrackerService.Service.Interface
{
    public interface IDatabaseBackupStrategy
    {
        Task<string> PerformBackupAsync();
        bool TestConnection();
    }
}
