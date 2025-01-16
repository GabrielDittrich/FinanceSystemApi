using System;

namespace Backend.Models;

public class Transacao
{
    public int Id { get; set; }
    public string? Descricao { get; set; }
    public decimal Valor { get; set; }
    public DateTime Data { get; set; }
    public int ContaId { get; set; }
    public Conta? Conta { get; set; }
}