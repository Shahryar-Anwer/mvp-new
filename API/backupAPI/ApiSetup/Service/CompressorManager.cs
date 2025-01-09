using System.Diagnostics;
using ZstdNet;

namespace TrackerService.Service
{
    public class CompressorManager
    {
        public void CompressBackup(string backupFilePath)
        {
            string compressedFilePath = backupFilePath + ".zip";

            try
            {
                using (var zip = new Ionic.Zip.ZipFile())
                {
                    zip.AddFile(backupFilePath, string.Empty);
                    zip.Save(compressedFilePath);
                }

                Console.WriteLine($"Compressed backup created: {compressedFilePath}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during compression: {ex.Message}");
            }
        }
        //public string DecompressBackup(string zipFilePath, string extractDirectory)
        //{
        //    try
        //    {
        //        ZipFile.ExtractToDirectory(zipFilePath, extractDirectory);
        //        Console.WriteLine($"Backup decompressed to: {extractDirectory}");
        //        return Path.Combine(extractDirectory, Path.GetFileNameWithoutExtension(zipFilePath) + ".sql");
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Error during decompression: {ex.Message}");
        //        throw;
        //    }
        //}
        //public void CompressWith7Zip(string backupFilePath)
        //{
        //    string compressedFilePath = backupFilePath + ".7z";
        //    string sevenZipPath = "C:\\Program Files\\7-Zip\\7z.exe"; // Path to 7-Zip executable

        //    try
        //    {
        //        if (!File.Exists(backupFilePath))
        //        {
        //            Console.WriteLine($"Backup file not found: {backupFilePath}");
        //            return;
        //        }

        //        var startInfo = new ProcessStartInfo
        //        {
        //            FileName = sevenZipPath,
        //            Arguments = $"a -t7z \"{compressedFilePath}\" \"{backupFilePath}\" -mx=9", // -mx=9: Maximum compression level
        //            RedirectStandardOutput = true,
        //            RedirectStandardError = true,
        //            UseShellExecute = false,
        //            CreateNoWindow = true,
        //        };

        //        using (var process = new Process { StartInfo = startInfo })
        //        {
        //            process.Start();
        //            string output = process.StandardOutput.ReadToEnd();
        //            string error = process.StandardError.ReadToEnd();
        //            process.WaitForExit();

        //            if (process.ExitCode != 0)
        //            {
        //                throw new Exception($"7-Zip compression failed: {error}");
        //            }

        //            Console.WriteLine($"Compressed backup created: {compressedFilePath}");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Error during compression: {ex.Message}");
        //    }
        //}

        //public void CompressWithZstd(string inputFile, string outputFile)
        //{
        //    try
        //    {
        //        using (var input = File.OpenRead(inputFile))
        //        using (var output = File.Create(outputFile))
        //        using (var compressor = new Compressor())
        //        {
        //            compressor.Wrap(input, output);
        //        }

        //        Console.WriteLine($"Compressed file created: {outputFile}");
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Error during compression: {ex.Message}");
        //    }
        //}
    }
}
