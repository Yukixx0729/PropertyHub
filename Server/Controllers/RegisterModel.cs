namespace Server.Models
{
    public class Register
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string UserRole { get; set; }
    }
}