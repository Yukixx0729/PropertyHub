namespace Server.Models
{
    public class NewSaved
    {
        public Guid Id { get; set; }

        public required string RenterId { get; set; }

        public required Guid PropertyId { get; set; }
    }
}
