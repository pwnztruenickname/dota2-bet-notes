using Application.Mapping;
using Application.Services.Migrations;
using DotaStatistics.Extensions;
using DotaStatistics.Mapping;
using Newtonsoft.Json.Converters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
     .AddNewtonsoftJson(opts => opts.SerializerSettings.Converters.Add(new StringEnumConverter()));
// builder.Services.ConfigureHttpJsonOptions(options => options.SerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddSwaggerGen(options =>
{
     options.SupportNonNullableReferenceTypes();
});

builder.Services.AddCors(options =>
{
     options.AddPolicy("AllowAll",
          corsPolicyBuilder =>
          {
               corsPolicyBuilder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
          });

});

builder.Services.AddSwaggerGenNewtonsoftSupport();
builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddRefit();
builder.Services.AddAutoMapper(typeof(HeroContractMappingProfile).Assembly, typeof(HeroDtoMappingProfile).Assembly);
builder.Services.AddApplicationServices();

var app = builder.Build();

//Применяем миграции 
await using var scope = app.Services.CreateAsyncScope();
var migratorService = scope.ServiceProvider.GetRequiredService<IMigrationService>();
await migratorService.MigrateAsync();

app.UseCors("AllowAll"); 
app.MapControllers();
app.UseSwagger();
app.UseSwaggerUI();

app.Run();