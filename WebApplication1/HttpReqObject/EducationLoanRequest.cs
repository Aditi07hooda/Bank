namespace WebApplication1.HttpReqObject
{
    public class EducationLoanRequest
    {
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string Purpose { get; set; }
        public int Terms { get; set; }
        public string InstituteName { get; set; }
        public string CourseName { get; set; }
        public string InstituteCountry { get; set; }
        public IFormFile ProofOfAdmission { get; set; }
    }
}
