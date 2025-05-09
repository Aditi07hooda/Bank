using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class TransferService
    {
        private readonly BankDatabaseContext _context;

        public TransferService(BankDatabaseContext context)
        {
            _context = context;
        }

        public void TransferMoney(string fromAccountName, string toAccountName, decimal amount)
        {
            var fromAccount = _context.bank.FirstOrDefault(b => b.Name.Equals(fromAccountName));
            var toAccount = _context.bank.FirstOrDefault(b => b.Name.Equals(toAccountName));
            if (fromAccount == null || toAccount == null)
            {
                throw new Exception("One or both accounts do not exist.");
            }
            if (fromAccount.Balance < amount)
            {
                throw new Exception("Insufficient funds.");
            }
            fromAccount.Withdraw(fromAccount, amount);
            toAccount.Deposit(toAccount, amount);
            AddTransaction("Transfer-Withdraw", amount, DateTime.Now, fromAccount.Id);
            AddTransaction("Transfer-Deposit", amount, DateTime.Now, toAccount.Id);
            _context.Entry(fromAccount).State = EntityState.Modified;
            _context.Entry(toAccount).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void AddTransaction(string transactionType, decimal amount, DateTime transactionDate, int userID)
        {
            _context.transactionHistory.Add(new TransactionHistory(transactionType, amount, transactionDate, userID));
            _context.SaveChanges();
        }

        public IQueryable<TransactionHistory> getAllTransactionHistory(string username)
        {
            var acc = _context.bank.FirstOrDefault(b => b.Name.Equals(username));
            var transaction = _context.transactionHistory.Where(t => t.UserId.Equals(acc.Id));
            if (transaction == null)
            {
                throw new Exception("No transaction history found for this account.");
            }
            return transaction;
        }
    }
}
