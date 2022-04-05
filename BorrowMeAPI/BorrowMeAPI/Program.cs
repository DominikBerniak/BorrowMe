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
builder.Services.ConfigureSwagger();
//ConfigureStartup.ConfigureSwagger(builder.Services);

// Add services to the container.
builder.Services.InjectServices();

//Add automapper
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

//Add Authentication
builder.AddAuthentication();

//Add signalR
builder.Services.AddSignalR();

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

app.MapHub<ChatHub>("/chat");

app.Run();