using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using TrackerService.Models.Api;
using ApiSetupProject.Models.Api;
using TrackerService.Service.Implementation;
using TrackerService.Service;
using System;
using ApiSetupProject.Service;
using Microsoft.EntityFrameworkCore;

namespace TrackerService.Controllers;

[ApiController]
[ApiVersion("1.0")]
//[ApiVersion("1.2")]
[Route("api/v{version:apiVersion}/[controller]")]
public class BackupController : ControllerBase
{
    private readonly ILogger<BackupController> _logger;
    private readonly ApplicationDbContext _context;
    public BackupController(ILogger<BackupController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpPost]
    [Route("CreateBackup")]
    public async Task<ActionResult<Response>> CreateBackup(string ConnectionString)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest($"invalid request data");
        }
        var data = ConnectionString.Split(',');
        _logger.LogInformation($"Received request for data: {ConnectionString}");
        _logger.LogInformation("Processing RegisterConnection request.");

        string backupDirectory = "C:\\BackupData";
        string backupFilePath;

        var strategy = new PostgresBackupStrategy(
            backupDirectory,
            data[0],
            data[1],
            data[2],
            data[3]
        );

        var manager = new BackupManager(strategy);

        try
        {
            _logger.LogInformation("Starting PostgreSQL Backup...");
            backupFilePath = await manager.RunBackupAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error during PostgreSQL backup: {ex.Message}");
            return BadRequest("Unable to create backup");
        }

        try
        {
            _logger.LogInformation("Compressing Backup...");
            var compressorManager = new CompressorManager();
            compressorManager.CompressBackup(backupFilePath);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error during backup compression: {ex.Message}");
            return BadRequest("Backup created but compression failed.");
        }
        //S3 Code to push backup file
        //backupFilePath + ".zip";

        _logger.LogInformation("Backup and compression completed.");
        return Ok($"Backup and compression completed. File path: {backupFilePath}");
    }

    [HttpPost]
    [Route("RegisterDatabase")]
    public async Task<ActionResult<Response>> RegisterDatabase([FromBody] DBModel dataJson)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest($"invalid request data");
        }

        _logger.LogInformation($"Received request for data: {dataJson}");
        _logger.LogInformation("Processing RegisterConnection request.");

        string backupDirectory = "C:\\BackupData";
        string backupFilePath;

        var strategy = new PostgresBackupStrategy(
            backupDirectory,
            dataJson.postgresUser,
            dataJson.postgresPassword,
            dataJson.postgresHost,
            dataJson.postgresDatabase
        );

        var manager = new BackupManager(strategy);

        try
        {
            _logger.LogInformation("Checking PostgreSQL connection...");
            var isConnected = manager.CheckConnection();
            if (!isConnected)
                return BadRequest("Unable to connect to database");
        }
        catch (Exception ex)
        {
            _logger.LogError($"Unable to connect to database: {ex.Message}");
            return BadRequest("Unable to connect to databasep");
        }
        try
        {
            var connstring = dataJson.postgresUser + "," +
           dataJson.postgresPassword + "," +
           dataJson.postgresHost + "," +
           dataJson.postgresDatabase;
            var encryptedData = EncryptionHelper.Encrypt(connstring);
            _context.ConnectionStrings.Add(new ConnectionString()
            {
                ConnectionStringDB = encryptedData,
                CreatedAt = DateTime.Now,
                DatabaseType = "Postgres",
                Name = dataJson.postgresDatabase
            });
            _context.SaveChanges();
        }
        catch (Exception e)
        {
            _logger.LogError($"Unable to connect to database: {e.Message}");
        }
        _logger.LogInformation("Database Registered completed.");
        return Ok($"Database Registered completed.");
    }
    [HttpGet]
    public IActionResult GetDataBases()
    {
        try
        {
            var data = _context.ConnectionStrings.ToList();

            // Decrypt ConnectionStringDB for each entry
            foreach (var conn in data)
            {
                conn.ConnectionStringDB = EncryptionHelper.Decrypt(conn.ConnectionStringDB);
            }

            // Return the decrypted data
            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = "An error occurred while fetching data.", error = e.Message });
        }
    }

    // For versioning, use the MapToApiVersion("1.2") attribute and use ApiVersion() attribute in the controller.
    // Can be used in multiple files for the same controller
    //[HttpPost]
    //[Route("Method1"), MapToApiVersion("1.2")]
    //[Consumes(MediaTypeNames.Application.Json)]
    //[Produces(MediaTypeNames.Application.Json)]
    //public RegisterLocationResponse Track12(RegisterLocationRequest? registerLocation)
    //{
    //    if (!ModelState.IsValid)
    //{
    // return BadRequest($"invalid request data");
    //}

    //_logger.LogInformation($"Received request for data: {dataJson}");
    //var response = new Response();
    // return Ok(response);
    //}



}