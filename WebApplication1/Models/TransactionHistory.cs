using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public class TransactionHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string TransactionType { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }

        [Required]
        [ForeignKey("Bank")]
        public int UserId { get; set; }

        public TransactionHistory() { }

        public TransactionHistory(string transactionType, decimal amount, DateTime transactionDate, int userID)
        {
            TransactionType = transactionType;
            Amount = amount;
            TransactionDate = transactionDate;
            UserId = userID;
        }
    }
}
