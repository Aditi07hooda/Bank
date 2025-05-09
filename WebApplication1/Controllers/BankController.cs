using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("/bank")]
public class BankController : ControllerBase
{
    private readonly BankOperation operation;

    public BankController(BankOperation _operation)
    {
        operation = _operation;
    }

    [HttpGet("allAcc")]
    public IList<Bank> GetAllBankAcc()
    {
        return operation.GetAllBankAccount();
    }

    [HttpPost("getAcc")]
    public IActionResult GetBankAcc([FromForm] string name, [FromForm] string password = "")
    {
        IActionResult obj = operation.GetBankAccount(name, password);
        if (obj is OkObjectResult res)
        {
            dynamic? result = res.Value;
            var token = result?.Token;
            Response.Headers.Add("x-auth-token", token);
        }
        return obj;
    }

    [HttpPost("createAcc")]
    public IActionResult CreateBankAccount([FromForm] string name, [FromForm] int age, [FromForm] string password, [FromForm] decimal balance = 0)
    {
        IActionResult obj = operation.CreateAccount(name, age, password, balance);
        if (obj is OkObjectResult res)
        {
            var resultValue = res.Value;
            dynamic? data = resultValue;
            var token = data?.Token;
            Response.Headers.Add("x-auth-token", token);
        }
        return obj;
    }

    [Authorize]
    [HttpPost("deposit")]
    public Bank DepositMoney([FromQuery] string name, [FromBody] decimal amount)
    {
        return operation.DepositMoney(name, amount);
    }

    [Authorize]
    [HttpPost("withdraw")]
    public Bank WithDrawMoney([FromQuery] string name, [FromBody] decimal amount)
    {
        return operation.WithdrawMoney(name, amount);
    }

    [HttpGet("alreadyAcc")]
    public IActionResult GetAlreadyAcc([FromBody] string name)
    {
        IActionResult obj = operation.GetBankAccount(name);
        if (obj is OkObjectResult res)
        {
            dynamic? result = res.Value;
            var token = result?.Token;
            Response.Headers.Add("x-auth-token", token);
        }
        return obj;
    }

    [Authorize]
    [HttpPut("editprofile")]
    public Bank EditAccountProfile([FromQuery] string name, [FromBody] EditProfile data)
    {
        string updatedName = data.UpdatedName ?? name;
        return operation.EditAccount(name, updatedName, data.Age);
    }

    [HttpDelete("delete")]
    public IActionResult DeleteUserAccount([FromQuery] int userID)
    {
        return operation.DeleteAccount(userID);
    }
}
