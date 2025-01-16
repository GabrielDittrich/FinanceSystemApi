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

    public void AlterarConta(int novaContaId)
    {
        if (novaContaId <= 0)
        {
            throw new ArgumentException("ID da conta inválido.");
        }

        ContaId = novaContaId;
    }
}
