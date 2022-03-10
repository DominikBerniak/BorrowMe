using Microsoft.EntityFrameworkCore;
using BorrowMeAuth.Data;
using System.Reflection;
using Persistance;
using AuthenticationApi;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("BorrowMeAuthContextConnection");
builder.Services.AddDbContext<BorrowMeAuthContext>(options =>
    options.UseSqlServer(connectionString));

IConfiguration configuration = builder.Configuration;

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

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
