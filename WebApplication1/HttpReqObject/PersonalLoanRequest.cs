namespace WebApplication1.HttpReqObject
{
    public class PersonalLoanRequest
    {
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string Purpose { get; set; }
        public int Terms { get; set; }
        public decimal AnnualIncome { get; set; }
        public string WorkingOrganisation { get; set; }
        public IFormFile ProofOfWork { get; set; }
    }
}
