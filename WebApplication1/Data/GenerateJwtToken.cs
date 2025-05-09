using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebApplication1.Data
{
    public class GenerateJwtToken
    {
        public static string GenerateToken(string username)
        {
            var claims = new[]{
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("uhdsfnj1874BGAS&%&274278jfh_&y6733bhGfysFAFDYFghusDdga63hdsf"));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    issuer: "https://localhost:7296",
                    audience: "http://localhost:4200",
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(10),
                    signingCredentials: cred
            );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
