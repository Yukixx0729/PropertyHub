using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddAuthorization();
builder.Services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders().AddApiEndpoints();
builder.Services.AddControllers();



builder.Services.AddCors(options =>
       {
           options.AddPolicy("AllowOrigin",
               builder => builder.WithOrigins("http://localhost:5173")
                                 .AllowAnyHeader()
                                 .AllowAnyMethod()
                                 .AllowCredentials());
       });
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowOrigin");
app.MapIdentityApi<ApplicationUser>();

app.MapPost("/setrole", async (UserManager<ApplicationUser> userManager, string email, string role, HttpContext context) =>
{
    var user = await userManager.FindByEmailAsync(email);
    if (user == null)
    {
        context.Response.StatusCode = StatusCodes.Status404NotFound;
        return;
    }
    user.UserRole = role;
    var result = await userManager.UpdateAsync(user);
    if (result.Succeeded)
    {
        context.Response.StatusCode = StatusCodes.Status200OK;
    }
    else
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        await context.Response.WriteAsync("Error updating user's role.");
    }
});



app.MapPost("/logout", async (SignInManager<ApplicationUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    return Results.Ok();
}).RequireAuthorization();


app.MapGet("/pingauth", async (ClaimsPrincipal user, UserManager<ApplicationUser> userManager) =>
{
    var email = user.FindFirstValue(ClaimTypes.Email);
    if (email is not null)
    {
        var userData = await userManager.FindByEmailAsync(email);

        if (userData != null)
        {
            return Results.Json(new
            {
                userData.Id,
                userData.UserName,
                userData.Email,
                userData.UserRole,


            });
        }

    }
    return Results.NotFound();
}).RequireAuthorization();


app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();


