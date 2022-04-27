using BorrowMeAuth.DTO;
using System.IdentityModel.Tokens.Jwt;
using Core.Model.DataTransferObjects;

namespace BorrowMeAuth.Areas.Identity.Data
{
    public interface IAuthenticationManager
    {
        Task<AuthenticationStatus> ValidateApiUser(LoginApiUserDto userDto);
        Task<string> CreateJwtToken();

        JwtSecurityToken Verify(string token);
    }
}
