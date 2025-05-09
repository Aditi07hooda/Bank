using WebApplication1.Models;

namespace WebApplication1.Interface
{
    public interface IBankAccount
    {
        IList<Bank> BankAccounts { get; }

        public void AddAccount(Bank b);
    }
}
