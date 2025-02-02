﻿using BorrowMeAuth.Areas.Identity.Data;
using BorrowMeAuth.DTO;
using Domain.Entieties;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Core.Model.DataTransferObjects;

namespace AuthenticationApi.Infrastructure
{
    public class AuthenticationManager : IAuthenticationManager
    {
        private readonly UserManager<BorrowMeAuthUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthenticationManager> _logger;
        private BorrowMeAuthUser _user;

        public AuthenticationManager(UserManager<BorrowMeAuthUser> userManager, IConfiguration configuration, ILogger<AuthenticationManager> logger)
        {
            this._userManager = userManager;
            this._configuration = configuration;
            this._logger = logger;
        }
        public async Task<string> CreateJwtToken()
        {
            var signingCredentials = GetSigningCredentials();
            var claims = await GetClaims();
            var tokenOptions = GenerateTokenOptions(signingCredentials, claims);
            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var issuer = jwtSettings.GetSection("Issuer").Value;
            var audience = jwtSettings.GetSection("Audience").Value;
            var lifetime = Convert.ToDouble(jwtSettings.GetSection("Lifetime").Value);
            var expires = DateTime.Now.AddMinutes(lifetime);

            var token = new JwtSecurityToken(
                    issuer: issuer,
                    audience: audience,
                    expires: expires,
                    claims: claims,
                    signingCredentials: signingCredentials
                );

            return token;
        }

        private async Task<List<Claim>> GetClaims()
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, _user.Email),
            };
            var roles = await _userManager.GetRolesAsync(_user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            return claims;
        }

        private SigningCredentials GetSigningCredentials()
        {
            var key = _configuration.GetSection("Jwt").GetSection("Key").Value;
            var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        public async Task<AuthenticationStatus> ValidateApiUser(LoginApiUserDto userDto)
        {
            _user = await _userManager.FindByEmailAsync(userDto.Email);
            if (_user is null )
            {
                return AuthenticationStatus.Unauthorized;
            }
            if (!_user.EmailConfirmed)
            {
                return AuthenticationStatus.EmailNotConfirmed;
            }
            if (!await _userManager.CheckPasswordAsync(_user, userDto.Password))
            {
                return AuthenticationStatus.Unauthorized;
            }
            return AuthenticationStatus.LoggedIn;
        }

        public JwtSecurityToken Verify(string jtw)
        {
            var secretKey = _configuration.GetSection("Jwt").GetSection("Key").Value;
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            tokenHandler.ValidateToken(jtw, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);
            return (JwtSecurityToken) validatedToken;
        }
    }
}
