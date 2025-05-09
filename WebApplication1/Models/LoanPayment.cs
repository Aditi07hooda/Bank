using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    [Table(name: "loan_payment")]
    public class LoanPayment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("Loan")]
        public int LoanId { get; set; }

        public DateTime PaymentDate { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal AmountPaid { get; set; }

        public decimal RemainingBalanceAfterPayment { get; set; }

        public Loan Loan { get; set; }

        public LoanPayment() { }

        public LoanPayment(int loanId, DateTime paymentDate, decimal amountPaid, decimal remainingBalance)
        {
            LoanId = loanId;
            PaymentDate = paymentDate;
            AmountPaid = amountPaid;
            RemainingBalanceAfterPayment = remainingBalance;
        }
    }
}
