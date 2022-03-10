using BorrowMeAuth.DTO;
using System.IdentityModel.Tokens.Jwt;

namespace BorrowMeAuth.Areas.Identity.Data
{
    public interface IAuthenticationManager
    {
        Task<bool> ValidateApiUser(LoginApiUserDto userDto);
        Task<string> CreateJwtToken();

        JwtSecurityToken Verify(string token);
    }
}
