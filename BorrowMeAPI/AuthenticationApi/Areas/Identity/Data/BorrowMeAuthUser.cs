using Microsoft.AspNetCore.Identity;

namespace BorrowMeAuth.Areas.Identity.Data;

// Add profile data for application users by adding properties to the BorrowMeAuthUser class
public class BorrowMeAuthUser : IdentityUser
{
    public string BusinessUserId { get; set; }
    public override string ToString()
    {
        return $"{Id}";
    }
}