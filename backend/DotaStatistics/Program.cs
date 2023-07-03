using Application.Mapping;
using Application.Services.Migrations;
using DotaStatistics.Extensions;
using DotaStatistics.Mapping;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddRefit();
builder.Services.AddAutoMapper(typeof(HeroContractMappingProfile).Assembly, typeof(HeroDtoMappingProfile).Assembly);
builder.Services.AddApplicationServices();

var app = builder.Build();

//Применяем миграции 
await using var scope = app.Services.CreateAsyncScope();
var migratorService = scope.ServiceProvider.GetRequiredService<IMigrationService>();
await migratorService.MigrateAsync();

app.MapControllers();
app.UseSwagger();
app.UseSwaggerUI();

app.Run();