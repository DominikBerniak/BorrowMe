global using Microsoft.EntityFrameworkCore;
using Api;
using Api.Hubs.Api.Messaging;
using Microsoft.Extensions.FileProviders;
using Persistance;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",
                builder =>
                {
                    builder
                    .WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
                }));

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

//Add signalR
builder.Services.AddSignalR();

//Add Authentication
ConfigureStartup.AddAuthentication(builder);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

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

app.MapHub<ChatHub>("/api/chat");

app.Run();