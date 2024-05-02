using Microsoft.AspNetCore.Identity;

namespace Server.Models.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public bool IsLandlord { get; set; }

        public virtual ICollection<MySaved>? MySaved { get; set; }

        public virtual ICollection<Property>? Property { get; set; }
    }
}
