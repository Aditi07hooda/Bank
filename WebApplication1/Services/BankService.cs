using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using WebApplication1.Data;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class BankService : IBankAccount
    {
        public IList<Bank> BankAccounts { get; private set; }

        private readonly BankDatabaseContext _context;
        private readonly TransferService transferService;

        public BankService(BankDatabaseContext context, TransferService service)
        {
            BankAccounts = new List<Bank>();
            _context = context;
            transferService = service;
        }

        public void AddAccount(Bank b)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(b.Password));
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                b.Password = builder.ToString();
            }
            _context.bank.Add(b);
            _context.SaveChanges();
            _context.Entry(b).State = EntityState.Detached;
        }

        public IActionResult DeleteAccount(int userId)
        {
            using var transaction = _context.Database.BeginTransaction();

            var bank = _context.bank.FirstOrDefault(b => b.Id == userId)
                       ?? throw new Exception("Bank account not found");

            var loan = _context.loan.FirstOrDefault(l => l.UserId == userId);

            if (loan != null)
            {
                var payments = _context.loan_payment.Where(p => p.LoanId == loan.Id).ToList();
                var interest = _context.loan_interest.FirstOrDefault(i => i.Id == loan.Id);

                if (payments.Any())
                    _context.loan_payment.RemoveRange(payments);

                if (interest != null)
                    _context.loan_interest.Remove(interest);

                _context.loan.Remove(loan);
            }
            _context.bank.Remove(bank);

            _context.SaveChanges();
            transaction.Commit();

            return new OkObjectResult(new { userId = userId, status = "Account deleted successfully" });
        }


        public IList<Bank> GetAllBankAccount()
        {
            var allAcc = from bank in _context.bank
                         select bank;
            foreach (Bank item in allAcc)
            {
                BankAccounts.Add(item);
            }
            return this.BankAccounts;
        }

        public Bank? GetBankAccount(string name, string password = "")
        {
            Bank? b = _context.bank.FirstOrDefault(b => b.Name.Equals(name)) ?? throw new Exception("Account not found");
            Boolean match = true;
            if (!password.Equals(""))
            {
                using (SHA256 sha256 = SHA256.Create())
                {
                    byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                    StringBuilder builder = new StringBuilder();
                    for (int i = 0; i < bytes.Length; i++)
                    {
                        builder.Append(bytes[i].ToString("x2"));
                    }
                    string hashedPassword = builder.ToString();
                    match = hashedPassword.Equals(b.Password);
                }
            }
            if (!match)
            {
                throw new AuthenticationTagMismatchException("Password does not match");
            }
            return b;
        }

        public Bank DepositMoney(string name, decimal amount)
        {
            Bank b = GetBankAccount(name) ?? throw new Exception("Bank Account doesnot exists");
            b.Deposit(b, amount);
            Console.WriteLine("the updated version - " + b);
            transferService.AddTransaction("Deposit", amount, DateTime.Now, b.Id);
            _context.Entry(b).State = EntityState.Modified;
            _context.SaveChanges();
            return b;
        }

        public Bank WithdrawMoney(string name, decimal amount)
        {
            Bank b = GetBankAccount(name) ?? throw new Exception("Bank Account doesnot exists");
            b.Withdraw(b, amount);
            transferService.AddTransaction("Withdraw", amount, DateTime.Now, b.Id);
            _context.Entry(b).State = EntityState.Modified;
            _context.SaveChanges();
            return b;
        }

        public Bank EditProfile(string name, string updatedName, int age = 0)
        {
            Bank b = GetBankAccount(name) ?? throw new NullReferenceException("Account not found");
            b.Edit(updatedName, age);
            _context.Entry(b).State = EntityState.Modified;
            _context.SaveChanges();
            return b;
        }
    }
}
