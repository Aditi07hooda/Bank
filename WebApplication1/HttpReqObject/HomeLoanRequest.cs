namespace WebApplication1.HttpReqObject
{
    public class HomeLoanRequest
    {
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string Purpose { get; set; }
        public int Terms { get; set; }
        public string PropertyName { get; set; }
        public string PropertyAddress { get; set; }
        public IFormFile ProofOfProperty { get; set; }
    }
}
