using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models
{
    public enum LoanType
    {
        Education,
        Home,
        Personal
    }

    public enum LoanStatus
    {
        Pending,
        Approved,
        Rejected,
        Completed,
    }

    [Table(name: "loan")]
    public class Loan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public LoanType TypeOfLoans { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        public int Terms { get; set; }

        [Required]
        public string Purpose { get; set; }

        [Required]
        public LoanStatus Status { get; set; } = LoanStatus.Pending;

        // education loan
        public string? InstituteName { get; set; }
        public string? CourseName { get; set; }
        public string? InstituteCountry { get; set; }
        public Byte[]? ProofOfAdmission { get; set; }

        // home loan
        public string? PropertyName { get; set; }
        public string? PropertyAddress { get; set; }
        public Byte[]? ProofOfProperty { get; set; }

        // personal loan
        [Column(TypeName = "decimal(18,2)")]
        public decimal? AnnualIncome { get; set; }
        public string? WorkingOrganisation { get; set; }
        public Byte[]? ProofOfWork { get; set; }

        public Loan() { }

        public Loan(
            int userId,
            LoanType typeOfLoans,
            decimal amount,
            int terms,
            string purpose,
            string? propertyName = null,
            string? propertyAddress = null,
            string? workingOrganisation = null,
            decimal? annualIncome = null,
            string? instituteName = null,
            string? courseName = null,
            string? instituteCountry = null,
            Byte[]? proofOfProperty = null,
            Byte[]? proofOfWork = null,
            Byte[]? proofOfAdmission = null,
            LoanStatus status = LoanStatus.Pending
            )
        {
            UserId = userId;
            TypeOfLoans = typeOfLoans;
            Amount = amount;
            Terms = terms;
            Purpose = purpose;
            PropertyName = propertyName;
            PropertyAddress = propertyAddress;
            WorkingOrganisation = workingOrganisation;
            AnnualIncome = annualIncome;
            InstituteName = instituteName;
            CourseName = courseName;
            InstituteCountry = instituteCountry;
            ProofOfProperty = proofOfProperty;
            ProofOfWork = proofOfWork;
            ProofOfAdmission = proofOfAdmission;
            Status = status;
        }
    }
}
