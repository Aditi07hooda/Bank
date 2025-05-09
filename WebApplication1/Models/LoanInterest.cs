using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class LoanInterest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [ForeignKey("Loan")]
        public int LoanId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal InterestRate { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal LoanAmount { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmountToBePaid { get; set; }

        public Loan Loan { get; set; }

        public LoanInterest() { }

        public LoanInterest(int loanId, DateTime startDate, DateTime endDate, decimal interestRate, decimal loanAmount, decimal totalAmountToBePaid)
        {
            this.LoanId = loanId;
            this.StartDate = startDate;
            this.EndDate = endDate;
            this.InterestRate = interestRate;
            this.LoanAmount = loanAmount;
            this.TotalAmountToBePaid = totalAmountToBePaid;
        }
    }
}
