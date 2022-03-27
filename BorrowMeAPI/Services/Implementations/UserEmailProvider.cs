using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace Services.Implementations
{
    public class UserEmailProvider : IUserIdProvider
    {
        public virtual string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirst(ClaimTypes.Email)?.Value!;
        }
    }
}
