global using BorrowMeAPI.Dao;
global using Microsoft.EntityFrameworkCore;
global using BorrowMeAPI.Model;
using BorrowMeAPI.Repositories;
using BorrowMeAPI.Services;
using BorrowMeAPI.Services.Implementations;
using BorrowMeAPI.Services.Interfaces;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DataDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<DataDbContext, DataDbContext>();
builder.Services.AddScoped<IAnnouncementService, AnnouncementService>();
builder.Services.AddTransient<IRepository<Announcement>, Repository<Announcement>>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddTransient<IRepository<MainCategory>, Repository<MainCategory>>();
builder.Services.AddScoped<ICityService, CityService>();
builder.Services.AddTransient<IRepository<City>, Repository<City>>();
builder.Services.AddTransient<IAnnouncementRepository, AnnouncementRepository>();

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
    RequestPath = "/StaticFiles"
});

app.UseAuthorization();

app.MapControllers();

app.Run();