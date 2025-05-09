using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class LoanService
    {
        private readonly BankDatabaseContext _dbContext;

        public LoanService(BankDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IActionResult RequestHomeLoan(string username, decimal amount, string purpose, int terms, string propertyName, string propertyAddress, IFormFile proofOfProperty)
        {
            Bank b = _dbContext.bank.FirstOrDefault((b) => b.Name == username) ?? throw new Exception("Account not found");

            Byte[]? file = null;

            if (proofOfProperty != null && proofOfProperty.Length > 0)
            {
                using var ms = new MemoryStream();
                proofOfProperty.CopyTo(ms);
                file = ms.ToArray();
            }

            LoanType type = LoanType.Home;
            Loan loan = new(b.Id, type, amount, terms, purpose, propertyName: propertyName, propertyAddress: propertyAddress, proofOfProperty: file);
            _dbContext.loan.Add(loan);
            _dbContext.SaveChanges();

            return new OkObjectResult(loan);
        }
        public IActionResult RequestPersonalLoan(string username, decimal amount, string purpose, int terms, decimal annualIncome, string workingOrganisation, IFormFile proofOfWork)
        {
            Bank b = _dbContext.bank.FirstOrDefault((b) => b.Name == username) ?? throw new Exception("Account not found");

            Byte[]? file = null;

            if (proofOfWork != null && proofOfWork.Length > 0)
            {
                using var ms = new MemoryStream();
                proofOfWork.CopyTo(ms);
                file = ms.ToArray();
            }

            LoanType type = LoanType.Personal;
            Loan loan = new(b.Id, type, amount, terms, purpose, annualIncome: annualIncome, workingOrganisation: workingOrganisation, proofOfWork: file);
            _dbContext.loan.Add(loan);
            _dbContext.SaveChanges();

            return new OkObjectResult(loan);
        }
        public IActionResult RequestEducationLoan(string username, decimal amount, string purpose, int terms, string courseName, string instituteName, string instituteCountry, IFormFile proofOfAdmission)
        {
            Bank b = _dbContext.bank.FirstOrDefault((b) => b.Name == username) ?? throw new Exception("Account not found");

            Byte[]? file = null;

            if (proofOfAdmission != null && proofOfAdmission.Length > 0)
            {
                using var ms = new MemoryStream();
                proofOfAdmission.CopyTo(ms);
                file = ms.ToArray();
            }

            LoanType type = LoanType.Education;
            Loan loan = new(b.Id, type, amount, terms, purpose, courseName: courseName, instituteName: instituteName, instituteCountry: instituteCountry, proofOfAdmission: file);
            _dbContext.loan.Add(loan);
            _dbContext.SaveChanges();

            return new OkObjectResult(loan);
        }

        public IActionResult GetAllLoanRequests()
        {
            List<Loan> list = new();
            var allReq = from loan in _dbContext.loan where loan.Status == LoanStatus.Pending select loan;
            foreach (var item in allReq)
            {
                list.Add(item);
            }
            return new OkObjectResult(new { Requests = list });
        }

        public IActionResult ApproveLoanReq(int id)
        {
            Loan l = _dbContext.loan.FirstOrDefault((l) => l.Id == id) ?? throw new Exception("Loan request not found");
            Bank b = _dbContext.bank.FirstOrDefault((bank) => bank.Id == l.UserId) ?? throw new Exception("Account not found");
            l.Status = LoanStatus.Approved;
            b.Deposit(b, l.Amount);
            LoanInterest loanInterest = new LoanHandler().LoansHandler(l);

            if (loanInterest != null)
            {
                _dbContext.loan_interest.Add(loanInterest);

            }

            _dbContext.Entry(l).State = EntityState.Modified;
            _dbContext.Entry(b).State = EntityState.Modified;
            _dbContext.SaveChanges();
            return new OkObjectResult(l);
        }

        public IActionResult RejectLoanReq(int id)
        {
            Loan l = _dbContext.loan.FirstOrDefault((l) => l.Id == id) ?? throw new Exception("Loan request not found");
            l.Status = LoanStatus.Rejected;
            _dbContext.Entry(l).State = EntityState.Modified;
            _dbContext.SaveChanges();
            return new OkObjectResult(l);
        }

        public IActionResult GetAllNumbers()
        {
            int totalUsers = _dbContext.bank.Count();
            int pendingLoans = _dbContext.loan.Count(l => l.Status == LoanStatus.Pending);
            int rejectedLoans = _dbContext.loan.Count(l => l.Status == LoanStatus.Rejected);
            int acceptedLoans = _dbContext.loan.Count(l => l.Status == LoanStatus.Approved);

            return new OkObjectResult(new
            {
                TotalUsers = totalUsers,
                RequestedLoans = pendingLoans,
                RejectedLoans = rejectedLoans,
                AcceptedLoans = acceptedLoans
            });
        }

        public List<Loan> GetLoanHistory(string userName)
        {
            Bank? b = _dbContext.bank.Where(b => b.Name == userName).FirstOrDefault();
            List<Loan> l = _dbContext.loan.Where(ln => ln.UserId == b.Id).ToList();
            return l;
        }
    }
}
