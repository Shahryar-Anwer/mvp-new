using ApiSetupProject.Service;
using Asp.Versioning;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NLog;
using NLog.Web;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;
using TrackerService.Context;
using TrackerService.Hub;
using TrackerService.Swagger;

// Early init of NLog to allow startup and exception logging, before host is built
var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("init main");

try
{


	var builder = WebApplication.CreateBuilder(args);

	// Add services to the container.

	builder.Services.AddControllers(options =>
		{
			options.ReturnHttpNotAcceptable = true;
		})
		.AddDataAnnotationsLocalization()
		.AddXmlDataContractSerializerFormatters();

	builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();

	builder.Services.AddSwaggerGen(options =>
	{
		// Add a custom operation filter which sets default values
		options.OperationFilter<SwaggerDefaultValues>();
	});
    builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(/*cookie=> you can add some options here*/);
    builder.Logging.ClearProviders();
	builder.Logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
	builder.Host.UseNLog();

	builder.Services.AddApiVersioning(options =>
	{
		options.DefaultApiVersion = new ApiVersion(1, 0);
		options.AssumeDefaultVersionWhenUnspecified = true;
		options.ReportApiVersions = true;
	}).AddApiExplorer(options =>
	{
		options.GroupNameFormat = "'v'VVV";
		options.SubstituteApiVersionInUrl = true;
	});

	builder.Services.AddDbContext<ApplicationDbContext>(option =>
	{
		option.UseSqlServer("Data Source=.;Initial Catalog=BackupDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
	});

	// Configure Authentication
	//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	//    .AddJwtBearer(options =>
	//    {
	//        options.Authority = "https://localhost:5000/identity";
	//    });

	builder.Services.AddAuthorization(options =>
	{
		//options.AddPolicy("PolicyName(Replace)", policy => policy.RequireClaim("ClaimName(Replace)"));
	});
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAll", policy =>
        {
            policy.AllowAnyOrigin() // Allow requests from any origin
                  .AllowAnyMethod() // Allow all HTTP methods
                  .AllowAnyHeader(); // Allow all headers
        });
    });


    // Add Repositories
    //builder.Services.AddScoped<IRepository, Repository>();

    builder.Services.AddSignalR();

	var app = builder.Build();

    app.UseCors("AllowAll"); // Apply the CORS policy globally
                             // Configure the HTTP request pipeline  / middleware.

    #region pipeline
    if (app.Environment.IsDevelopment())
	{
		app.UseSwagger();
		app.UseSwaggerUI(options =>
		{
			options.ConfigObject = new ConfigObject
			{
				ShowCommonExtensions = true
			};
			var descriptions = app.DescribeApiVersions();
			foreach (var description in descriptions)
			{
				var url = $"/swagger/{description.GroupName}/swagger.json";
				var name = description.GroupName.ToUpperInvariant();
				options.SwaggerEndpoint(url, name);
			}
		});
		app.UseDeveloperExceptionPage();
	}
	app.UseHttpsRedirection();
	app.UseRouting();
	app.UseAuthentication();
	app.UseAuthorization();
	app.MapHub<DefaultHub>("hub");
	app.UseEndpoints(endpoint =>
	{
		endpoint.MapControllers();
	});

	//app.Run(async (httpContent) =>
	//{
	//    await httpContent.Response.WriteAsync("Not Found");
	//});

	app.Run();
	#endregion

}
catch (Exception exception)
{
	// NLog: catch setup errors
	logger.Error(exception, "Stopped program because of exception");
	throw;
}
finally
{
	// Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
	NLog.LogManager.Shutdown();
}