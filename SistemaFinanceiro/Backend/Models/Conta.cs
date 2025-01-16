using System;

namespace Backend.Models;

public class Conta
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public decimal Saldo { get; set; }
}