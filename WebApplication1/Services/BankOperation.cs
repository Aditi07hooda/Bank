using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Services;

public class BankOperation
{
    private readonly BankService _service;

    public BankOperation(BankService service)
    {
        _service = service;
    }

    public IActionResult CreateAccount(string name, int age, string password, decimal balance = 0)
    {
        Bank b = new(name, age, balance, password);
        _service.AddAccount(b);
        string token = GenerateJwtToken.GenerateToken(name);
        return new OkObjectResult(new { Account = b, Token = token });
    }

    public IActionResult DeleteAccount(int userId)
    {
        return _service.DeleteAccount(userId);
    }

    public IList<Bank> GetAllBankAccount()
    {
        return _service.GetAllBankAccount();
    }

    public IActionResult GetBankAccount(string name, string password = "")
    {
        Bank? b = _service.GetBankAccount(name, password) ?? throw new Exception("Account not fouind");
        string token = GenerateJwtToken.GenerateToken(name);
        return new OkObjectResult(new { Account = b, Token = token });
    }

    public Bank DepositMoney(string name, decimal amount)
    {
        return _service.DepositMoney(name, amount);
    }

    public Bank WithdrawMoney(string name, decimal amount)
    {
        return _service.WithdrawMoney(name, amount);
    }

    public Bank EditAccount(string name, string updatedName, int age)
    {
        return _service.EditProfile(name, updatedName, age);
    }
}
