using Microsoft.AspNetCore.Mvc;
using WebApplication1.HttpReqObject;
using WebApplication1.Services;

namespace WebApplication1.Controllers;

[ApiController]
[Route("/loan")]
public class LoanController : ControllerBase
{
    private readonly LoanService service;
    private readonly PaymentServices paymentServices;

    public LoanController(LoanService service, PaymentServices paymentServices)
    {
        this.service = service;
        this.paymentServices = paymentServices;
    }

    [HttpPost]
    [Route("homeloan")]
    public IActionResult RequestHomeLoan([FromForm] HomeLoanRequest obj)
    {
        IActionResult res = service.RequestHomeLoan(obj.Name,
        obj.Amount,
        obj.Purpose,
        obj.Terms,
        obj.PropertyName,
        obj.PropertyAddress,
        obj.ProofOfProperty);
        return Ok(res);
    }

    [HttpPost]
    [Route("personalLoan")]
    public IActionResult RequestPersonalLoan([FromForm] PersonalLoanRequest obj)
    {
        IActionResult res = service.RequestPersonalLoan(obj.Name, obj.Amount, obj.Purpose, obj.Terms, obj.AnnualIncome, obj.WorkingOrganisation, obj.ProofOfWork);
        return Ok(res);
    }

    [HttpPost]
    [Route("educationLoan")]
    public IActionResult RequestEducationLoan([FromForm] EducationLoanRequest obj)
    {
        IActionResult res = service.RequestEducationLoan(obj.Name, obj.Amount, obj.Purpose, obj.Terms, obj.CourseName, obj.InstituteName, obj.InstituteCountry, obj.ProofOfAdmission);
        return Ok(res);
    }

    [HttpGet]
    [Route("getAllRequests")]
    public IActionResult GetAllLoanRequest()
    {
        return Ok(service.GetAllLoanRequests());
    }

    [HttpPost]
    [Route("approve")]
    public IActionResult ApproveLoanRequest([FromBody] int id)
    {
        return Ok(service.ApproveLoanReq(id));
    }

    [HttpPost]
    [Route("reject")]
    public IActionResult RejectLoanRequest([FromBody] int id)
    {
        return Ok(service.RejectLoanReq(id));
    }

    [HttpGet]
    [Route("getNumbers")]
    public IActionResult GetAllNumbers()
    {
        return Ok(service.GetAllNumbers());
    }

    [HttpGet]
    [Route("history")]
    public IActionResult GetLoanHistory([FromQuery] string userName)
    {
        return Ok(service.GetLoanHistory(userName));
    }

    [HttpPost]
    [Route("payment")]
    public IActionResult PayLoan([FromQuery] int loanId, [FromBody] decimal amount)
    {
        return Ok(paymentServices.PayLoan(loanId, amount));
    }

    [HttpGet]
    [Route("payment-history")]
    public IActionResult GetLoanPayHistory([FromQuery] string username, [FromQuery] int loanId)
    {
        return Ok(paymentServices.GetPaymentHistory(loanId, username));
    }
}
