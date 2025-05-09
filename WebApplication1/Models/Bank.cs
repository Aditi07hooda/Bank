using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models;

public class Bank
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Balance { get; set; }

    [StringLength(20)]
    [Required]
    public string Name { get; set; }

    [Required]
    public int Age { get; set; }

    [Required]
    public string Password { get; set; }
    public Bank() { }
    public Bank(string name, int age, decimal balance, string password, int id = 0)
    {
        this.Password = password;
        this.Id = id;
        this.Name = name;
        this.Age = age;
        this.Balance = balance;
    }

    public void Deposit(Bank b, decimal amount)
    {
        if (amount <= 0)
        {
            throw new Exception("The amount should be greater than 0");
        }
        else
        {
            b.Balance += amount;
        }
    }

    public void Withdraw(Bank b, decimal amount)
    {
        if (amount <= 0)
        {
            throw new Exception("The amount should be greater than 0");
        }
        else if (amount > b.Balance)
        {
            throw new Exception("The balance in the account is not sufficient");
        }
        else
        {
            b.Balance -= amount;
        }
    }

    public void Edit(string name, int age = 0)
    {
        if (age < 0 || name.Equals(""))
        {
            throw new ArgumentNullException("The age or the name can't be 0 or empty string");
        }
        if (age == 0)
        {
            this.Name = name;
        }
        else
        {
            this.Age = age;
            this.Name = name;
        }
    }
}