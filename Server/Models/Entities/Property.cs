using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models.Entities
{
    public class Property
    {
        public Guid Id { get; set; }

        public required string Address { get; set; }

        public required string Postcode { get; set; }

        public required string Type { get; set; }

        public required int Rent { get; set; }

        public required int Bedroom { get; set; }

        public required int Bathroom { get; set; }

        public required int CarSpot { get; set; }

        public DateTime Availability { get; set; }

        public required bool IsVacant { get; set; }

        public required bool Heater { get; set; }

        public required bool Cooler { get; set; }

        public required bool IsPetAllowed { get; set; }

        public required bool Wardrobes { get; set; }

        [MaxLength(1000)]
        public required string Summary { get; set; }

        public DateTime CreatedAt { get; set; }

        [ForeignKey("UserId")]
        public required string LandlordId { get; set; }

        public virtual required ApplicationUser ApplicationUser { get; set; }

    }
}