using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class BankDatabaseContext : DbContext
    {
        public BankDatabaseContext()
        {
        }

        public DbSet<Bank> bank { get; set; }
        public DbSet<Loan> loan { get; set; }
        public DbSet<LoanInterest> loan_interest { get; set; }
        public DbSet<LoanPayment> loan_payment
        { get; set; }
        public DbSet<TransactionHistory> transactionHistory { get; set; }
        public BankDatabaseContext(DbContextOptions<BankDatabaseContext> options) : base(options) { }
    }
}
