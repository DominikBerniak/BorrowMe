using Microsoft.EntityFrameworkCore;
using BorrowMeAuth.Data;
using System.Reflection;
using Persistance;
using AuthenticationApi;
using Api.Hubs.Api.Messaging;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("BorrowMeAuthContextConnection");
builder.Services.AddDbContext<BorrowMeAuthContext>(options =>
    options.UseSqlServer(connectionString));

IConfiguration configuration = builder.Configuration;

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",
                builder =>
                {
                    builder
                    .WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
                }));

//Configure Identity
ConfigureStartup.ConfigureIdentity(builder.Services);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

//Configure Swagger
ConfigureStartup.ConfigureSwagger(builder.Services);

//Configure authentication
ConfigureStartup.AddAuthentication(builder);

//Inject services
ConfigureStartup.InjectServices(builder.Services);

//Add AutoMapper
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

//Add signalR
builder.Services.AddSignalR();

builder.Services.AddDbContext<DataDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();
app.MapHub<ChatHub>("/chat");

app.Run();
