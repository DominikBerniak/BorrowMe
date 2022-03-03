using BorrowMeAuth.DTO;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace MyHotels.WebApi.Infrastructure
{
    public interface IAuthenticationManager
    {
        Task<bool> ValidateApiUser(LoginApiUserDto userDto);
        Task<string> CreateJwtToken();

        JwtSecurityToken Verify(string token);
    }
}
