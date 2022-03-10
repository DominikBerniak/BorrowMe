using Core.Repositories;
using Core.Repositories.Interfaces;
using Core.Services;
using Core.Services.Interfaces;
using Domain.Entieties;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Persistance;
using Persistance.Repositories;
using Services.Implementations;

namespace Api
{
    public class ConfigureStartup
    {
        public static void ConfigureSwagger(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
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
                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                    new string[] { }
                }});
            });
        }
        public static void InjectServices(IServiceCollection services)
        {
            services.AddTransient<DataDbContext, DataDbContext>();
            services.AddScoped<IAnnouncementService, AnnouncementService>();
            services.AddScoped<IReservationRepository, ReservationRepository>();
            services.AddScoped<IRepository<Reservation>, Repository<Reservation>>();
            services.AddScoped<IReservationService, ReservationService>();
            services.AddTransient<IRepository<Announcement>, Repository<Announcement>>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddTransient<IRepository<MainCategory>, Repository<MainCategory>>();
            services.AddTransient<IRepository<SubCategory>, Repository<SubCategory>>();
            services.AddScoped<ICityService, CityService>();
            services.AddScoped<IUserService, UserService>();
            services.AddTransient<IRepository<City>, Repository<City>>();
            services.AddTransient<IRepository<Voivodeship>, Repository<Voivodeship>>();
            services.AddTransient<IVoivodeshipRepository, VoivodeshipRepository>();
            services.AddTransient<IVoivodeshipService, VoivodeshipService>();
            services.AddTransient<IAnnouncementRepository, AnnouncementRepository>();
            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<IRepository<User>, Repository<User>>();
            services.AddTransient<IUserRepository, UserRepository>();
        }
        public static void AddAuthentication(WebApplicationBuilder builder)
        {
            var jwtSettings = builder.Configuration.GetSection("Jwt");
            var key = builder.Configuration.GetSection("Jwt").GetSection("Key").Value;
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
        }
    }
}
