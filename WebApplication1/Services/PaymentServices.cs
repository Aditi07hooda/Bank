using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Services;

public class PaymentServices
{
    private readonly BankDatabaseContext _dbContext;

    public PaymentServices(BankDatabaseContext bankDatabaseContext)
    {
        this._dbContext = bankDatabaseContext;
    }

    public IActionResult PayLoan(int loanId, decimal amountPaid)
    {
        DateTime paymentDate = DateTime.Now;

        // Step 1: Fetch Loan Interest & Validate
        var loanInterest = _dbContext.loan_interest.FirstOrDefault(li => li.LoanId == loanId)
            ?? throw new Exception("Loan not found");

        // Step 2: Fetch Loan and User
        var loan = _dbContext.loan.FirstOrDefault(l => l.Id == loanId)
            ?? throw new Exception("Loan request not found");

        int userId = loan.UserId;

        // Step 3: Calculate Total Paid and Remaining
        decimal totalPaidSoFar = _dbContext.loan_payment
            .Where(p => p.LoanId == loanId)
            .Sum(p => (decimal?)p.AmountPaid) ?? 0;

        decimal totalAmountToBePaid = loanInterest.TotalAmountToBePaid;
        decimal remainingBeforePayment = totalAmountToBePaid - totalPaidSoFar;
        decimal balance = remainingBeforePayment - amountPaid;

        if (balance < 0)
            throw new Exception("Overpayment not allowed.");

        // Step 4: Check Bank Balance and Withdraw
        var bank = _dbContext.bank.FirstOrDefault(b => b.Id == userId)
            ?? throw new Exception("Bank account not found");

        if (bank.Balance < amountPaid)
            throw new Exception("Insufficient account balance.");

        bank.Balance -= amountPaid;

        // Step 5: Add Payment Record
        var payment = new LoanPayment
        {
            LoanId = loanId,
            PaymentDate = paymentDate,
            AmountPaid = amountPaid,
            RemainingBalanceAfterPayment = balance
        };

        _dbContext.loan_payment.Add(payment);
        _dbContext.Entry(bank).State = EntityState.Modified;

        // Step 6: Mark loan as completed if fully paid
        if (balance == 0)
        {
            loan.Status = LoanStatus.Completed;
            _dbContext.Entry(loan).State = EntityState.Modified;
        }

        // Step 7: Commit All Changes
        _dbContext.SaveChanges();

        return new OkObjectResult(new
        {
            BankAccount = bank,
            PaymentUpdates = payment
        });
    }

    public IActionResult GetPaymentHistory(int loanId, string username)
    {
        List<LoanPayment> l = _dbContext.loan_payment.Where(p => p.LoanId == loanId).ToList();
        decimal totalAmount = _dbContext.loan_interest
            .Where(p => p.LoanId == loanId)
            .Select(p => p.TotalAmountToBePaid)
            .FirstOrDefault();
        decimal? accountBalance = _dbContext.bank.Where(b => b.Name == username)
                                                 .Select(b => (decimal?)b.Balance)
                                                 .FirstOrDefault();

        return new OkObjectResult(new { LoanPayment = l, TotalAmount = totalAmount, AccountBalance = accountBalance });
    }
}
