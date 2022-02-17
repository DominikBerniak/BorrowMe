global using BorrowMeAPI.Dao;
global using BorrowMeAPI.Model;
global using BorrowMeAPI.Model.DataTransferObjects;
global using Microsoft.EntityFrameworkCore;
using BorrowMeAPI.Model.Entieties;
using BorrowMeAPI.Repositories;
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
builder.Services.AddTransient<IRepository<SubCategory>, Repository<SubCategory>>();
builder.Services.AddScoped<ICityService, CityService>();
builder.Services.AddTransient<IRepository<City>, Repository<City>>();
builder.Services.AddTransient<IRepository<Voivodeship>, Repository<Voivodeship>>();
builder.Services.AddTransient<IVoivodeshipRepository, VoivodeshipRepository>();
builder.Services.AddTransient<IVoivodeshipService, VoivodeshipService>();
builder.Services.AddTransient<IAnnouncementRepository, AnnouncementRepository>();
builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();
builder.Services.AddTransient<IRepository<User>, Repository<User>>();

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