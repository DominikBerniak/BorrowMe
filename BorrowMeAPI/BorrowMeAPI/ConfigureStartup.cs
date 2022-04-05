using Core.Repositories;
using Core.Repositories.Interfaces;
using Core.Services;
using Core.Services.Interfaces;
using Domain.Entieties;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Persistance;
using Persistance.Repositories;
using Services.Implementations;

namespace Api
{
    public static class ConfigureStartup
    {
        public static void ConfigureSwagger(this IServiceCollection services)
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
        public static void InjectServices(this IServiceCollection services)
        {
            services.AddScoped<DataDbContext, DataDbContext>();
            services.AddScoped<IAnnouncementService, AnnouncementService>();
            services.AddScoped<IReservationRepository, ReservationRepository>();
            services.AddScoped<IRepository<Reservation>, Repository<Reservation>>();
            services.AddScoped<IReservationService, ReservationService>();
            services.AddScoped<IRepository<Announcement>, Repository<Announcement>>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IRepository<MainCategory>, Repository<MainCategory>>();
            services.AddScoped<IRepository<SubCategory>, Repository<SubCategory>>();
            services.AddScoped<ICityService, CityService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IRepository<City>, Repository<City>>();
            services.AddScoped<IRepository<Voivodeship>, Repository<Voivodeship>>();
            services.AddScoped<IVoivodeshipRepository, VoivodeshipRepository>();
            services.AddScoped<IVoivodeshipService, VoivodeshipService>();
            services.AddScoped<IAnnouncementRepository, AnnouncementRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IRepository<User>, Repository<User>>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddSingleton<IUserIdProvider, UserEmailProvider>();
            services.AddScoped<IUserService, UserService>();
        }
        public static void AddAuthentication(this WebApplicationBuilder builder)
        {
            var jwtSettings = builder.Configuration.GetSection("Jwt");
            var key = builder.Configuration.GetSection("Jwt").GetSection("Key").Value;
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {

                        var accessToken = context.Request.Query["access_token"];
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) &&
                            ( path.StartsWithSegments("/chat") ))
                        {
                            context.Token = accessToken;
                        }
                        else
                        {
                            context.Token = context.Request.Cookies["jwt"];
                        }
                        return Task.CompletedTask;
                    }
                };
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
