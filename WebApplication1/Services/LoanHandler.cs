using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class LoanHandler
    {
        private const decimal HomeLoanRate = 7.5m;
        private const decimal EducationLoanRate = 4.0m;
        private const decimal PersonalLoanRate = 11.0m;

        public decimal CalculateInterest(Loan loan)
        {
            decimal rate = GetInterestRateForLoanType(loan.TypeOfLoans);
            int timeInYears = loan.Terms;

            return (loan.Amount * rate * timeInYears) / 100m;
        }

        private decimal GetInterestRateForLoanType(LoanType loanType)
        {
            return loanType switch
            {
                LoanType.Home => HomeLoanRate,
                LoanType.Education => EducationLoanRate,
                LoanType.Personal => PersonalLoanRate,
                _ => throw new ArgumentException("Invalid loan type.")
            };
        }
        public decimal CalculateTotalRepayment(Loan loan)
        {
            return loan.Amount + CalculateInterest(loan);
        }

        public LoanInterest LoansHandler(Loan loan)
        {
            decimal interest = CalculateInterest(loan);
            decimal totalAmountToBePaid = CalculateTotalRepayment(loan);
            DateTime startDate = DateTime.Now;
            DateTime endDate = startDate.AddYears(loan.Terms);
            LoanInterest loanInterest = new(loan.Id, startDate, endDate, interest, loan.Amount, totalAmountToBePaid);
            return loanInterest;
        }
    }
}
