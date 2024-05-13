using Microsoft.AspNetCore.Identity;

namespace Server.Models.Entities
{
    public class ApplicationUser : IdentityUser
    {

        public string? UserRole { get; set; }
        public virtual ICollection<MySaved>? MySaved { get; set; }

        public virtual ICollection<Property>? Property { get; set; }
    }
}
