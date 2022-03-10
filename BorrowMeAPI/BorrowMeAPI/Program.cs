global using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Persistance;
using System.Reflection;
using Api;


var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddControllers();
builder.Services.AddDbContext<DataDbContext>(options =>
              options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
              optionsBuilder => optionsBuilder.MigrationsAssembly("Api"))
             );

builder.Services.AddEndpointsApiExplorer();

//Configure swagger
ConfigureStartup.ConfigureSwagger(builder.Services);

// Add services to the container.
ConfigureStartup.InjectServices(builder.Services);

//Add automapper
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

//Add Authentication
ConfigureStartup.AddAuthentication(builder);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
           Path.Combine(builder.Environment.ContentRootPath, "Images")),
    RequestPath = "/api/StaticFiles"
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();