

using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models.Entities
{
    public class MySaved
    {
        public Guid Id { get; set; }

        [ForeignKey("UserId")]
        public required string RenterId { get; set; }
        public virtual required ApplicationUser ApplicationUser { get; set; }

        public required Guid PropertyId { get; set; }

        public virtual required Property Property { get; set; }
    }
}