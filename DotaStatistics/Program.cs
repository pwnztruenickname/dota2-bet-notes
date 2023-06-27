using Application.Mapping;
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

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Run();