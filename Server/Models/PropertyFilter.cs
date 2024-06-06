using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class PropertyFilter
    {

        public string? Postcode { get; set; }

        public int? MinRent { get; set; }

        public int? MaxRent { get; set; }

        public int? MinBedroom { get; set; }

        public int? MaxBedroom { get; set; }

        public bool? IsPetAllowed { get; set; }

        public int? Carspot { get; set; }



    }
}
