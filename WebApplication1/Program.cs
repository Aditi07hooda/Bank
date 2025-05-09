using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebApplication1.Data;
using WebApplication1.Interface;
using WebApplication1.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"])),
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ValidateIssuer = true,
        ValidateAudience = true,
    };
});

builder.Services.AddAuthorization();

// Add services to the container.


builder.Services.AddControllers();
builder.Services.AddScoped<IBankAccount, BankService>();
builder.Services.AddScoped<BankService>();
builder.Services.AddScoped<TransferService>();
builder.Services.AddScoped<LoanService>();
builder.Services.AddScoped<PaymentServices>();
builder.Services.AddScoped<BankOperation>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// cors setting
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CorsSetting",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .WithMethods("GET", "POST", "PUT", "DELETE")
                  .AllowAnyHeader()
                  .AllowCredentials();
        }
        );
});

// Database connection
builder.Services.AddDbContext<BankDatabaseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("WebApplication1Context")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsSetting");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
