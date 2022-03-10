global using Microsoft.EntityFrameworkCore;
using BorrowMeAuth.Areas.Identity.Data;
using BorrowMeAuth.Data;
using Core.Repositories;
using Core.Repositories.Interfaces;
using Core.Services;
using Core.Services.Interfaces;
using Domain.Entieties;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Persistance;
using Persistance.Repositories;
using Services.Implementations;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
// Add services to the container.

builder.Services.AddControllers();
//builder.Services.AddDbContext<DataDbContext>(options =>
//{
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
//});

builder.Services.AddDbContext<DataDbContext>(options =>
              options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
              optionsBuilder => optionsBuilder.MigrationsAssembly("Api"))
             );

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      Example: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
});

builder.Services.AddTransient<DataDbContext, DataDbContext>();
builder.Services.AddScoped<IAnnouncementService, AnnouncementService>();
builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
builder.Services.AddScoped<IRepository<Reservation>, Repository<Reservation>>();
builder.Services.AddScoped<IReservationService, ReservationService>();
builder.Services.AddTransient<IRepository<Announcement>, Repository<Announcement>>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddTransient<IRepository<MainCategory>, Repository<MainCategory>>();
builder.Services.AddTransient<IRepository<SubCategory>, Repository<SubCategory>>();
builder.Services.AddScoped<ICityService, CityService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddTransient<IRepository<City>, Repository<City>>();
builder.Services.AddTransient<IRepository<Voivodeship>, Repository<Voivodeship>>();
builder.Services.AddTransient<IVoivodeshipRepository, VoivodeshipRepository>();
builder.Services.AddTransient<IVoivodeshipService, VoivodeshipService>();
builder.Services.AddTransient<IAnnouncementRepository, AnnouncementRepository>();
builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();
builder.Services.AddTransient<IRepository<User>, Repository<User>>();
builder.Services.AddTransient<IUserRepository, UserRepository>();

builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());


//builder.Services.AddAuthentication();
//var b = builder.Services.AddIdentityCore<BorrowMeAuthUser>(q => q.User.RequireUniqueEmail = true);
//b = new IdentityBuilder(b.UserType, typeof(IdentityRole), builder.Services);
//b.AddRoles<IdentityRole>();
//b.AddEntityFrameworkStores<BorrowMeAuthContext>().AddDefaultTokenProviders();

var jwtSettings = builder.Configuration.GetSection("Jwt");
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
        ValidIssuer = "BorrowMeAuth",
        ValidAudience = "http://BorrowMe.com",
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(key))
    };
});





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