using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using BorrowMeAuth.Data;
using BorrowMeAuth.Areas.Identity.Data;
using System.Reflection;
using MyHotels.WebApi.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Core.Services.Interfaces;
using Services.Implementations;
using Core.Repositories;
using Domain.Entieties;
using Persistance.Repositories;
using Core.Repositories.Interfaces;
using Persistance;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("BorrowMeAuthContextConnection");
builder.Services.AddDbContext<BorrowMeAuthContext>(options =>
    options.UseSqlServer(connectionString));
//builder.Services.AddDefaultIdentity<BorrowMeAuthUser>(options => options.SignIn.RequireConfirmedAccount = false)
//    .AddEntityFrameworkStores<BorrowMeAuthContext>();
// Add services to the container.

IConfiguration configuration = builder.Configuration;

builder.Services.AddAuthentication();
var b = builder.Services.AddIdentityCore<BorrowMeAuthUser>(q => q.User.RequireUniqueEmail = true);
b = new IdentityBuilder(b.UserType, typeof(IdentityRole), builder.Services);
b.AddRoles<IdentityRole>();
b.AddEntityFrameworkStores<BorrowMeAuthContext>().AddDefaultTokenProviders();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddSingleton<IConfiguration, configuration>();

//JWT
var jwtSettings = configuration.GetSection("Jwt");
var key = "tajnyKlucztajnyKlucztajnyKlucztajnyKlucztajnyKlucztajnyKlucztajnyKlucztajnyKlucz";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.GetSection("Issuer").Value,
        ValidAudience = jwtSettings.GetSection("Audience").Value,
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(key))
    };
});


builder.Services.AddScoped<IAuthenticationManager, AuthenticationManager>();

builder.Services.AddDbContext<DataDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddTransient<DataDbContext, DataDbContext>();
builder.Services.AddTransient<IRepository<User>, Repository<User>>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IUserService, UserService>();

//Add AutoMapper
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

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
