using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.HttpReqObject;
using WebApplication1.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("/transfer")]
public class TransferController : ControllerBase
{
    private readonly TransferService _service;

    public TransferController(TransferService service)
    {
        _service = service;
    }

    [Authorize]
    [HttpPost("/fromtoAcc")]
    public IActionResult TransferMoney([FromBody] TransferMoney body)
    {
        _service.TransferMoney(body.FromAccountName, body.ToAccountName, body.Amount);
        return Ok();
    }

    // IActionResult return data in json format
    [Authorize]
    [HttpGet("getAllTransactions")]
    public IActionResult GetAllTransaction([FromQuery] string name)
    {
        var transactions = _service.getAllTransactionHistory(name);
        return Ok(transactions);
    }
}
