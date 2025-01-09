//namespace ApiSetupProject.Service.Implementation
//{


//    namespace S3BucketHelper
//    {
//        public class S3BucketHelper
//        {
//            private readonly string _accessKey;
//            private readonly string _secretKey;
//            private readonly string _bucketName;
//            private readonly string _region;

//            public S3Uploader(string accessKey, string secretKey, string bucketName, string region)
//            {
//                _accessKey = accessKey;
//                _secretKey = secretKey;
//                _bucketName = bucketName;
//                _region = region;
//            }

//            public async Task UploadFileAsync(string filePath, string keyName)
//            {
//                try
//                {
//                    var s3Client = new AmazonS3Client(_accessKey, _secretKey, Amazon.RegionEndpoint.GetBySystemName(_region));

//                    var fileTransferUtility = new TransferUtility(s3Client);

//                    // Upload the file to the specified bucket with the given key
//                    await fileTransferUtility.UploadAsync(filePath, _bucketName, keyName);

//                    Console.WriteLine($"File uploaded successfully to {_bucketName} with key {keyName}");
//                }
//                catch (AmazonS3Exception e)
//                {
//                    Console.WriteLine($"Error encountered on server. Message:'{e.Message}' when writing an object");
//                }
//                catch (Exception e)
//                {
//                    Console.WriteLine($"Unknown error encountered. Message:'{e.Message}'");
//                }
//            }
//        }
//    }

//}
