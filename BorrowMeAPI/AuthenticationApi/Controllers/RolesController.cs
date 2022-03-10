
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BorrowMeAuth.Controllers
{
    [Route("admin/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        public RolesController(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        [HttpPost]
        public async Task<IActionResult> AddRole(IdentityRole role)
        {
            var createdRole = await _roleManager.CreateAsync(role);
            return Ok(createdRole);
        }
    }
}
