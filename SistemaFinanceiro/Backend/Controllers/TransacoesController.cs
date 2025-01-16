using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransacoesController : ControllerBase
    {
        private readonly FinanceContext _context;

        public TransacoesController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/transacoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transacao>>> GetTransacoes()
        {
            return await _context.Transacoes.Include(t => t.Conta).ToListAsync();
        }

        [HttpPut("{id}/alterar-conta")]
        public async Task<IActionResult> AlterarConta(int id, [FromBody] int novaContaId)
        {
            // Verificar se a transação existe
            var transacao = await _context.Transacoes.FindAsync(id);
            if (transacao == null)
            {
                return NotFound("Transação não encontrada.");
            }

            // Verificar se a nova conta existe
            var conta = await _context.Contas.FindAsync(novaContaId);
            if (conta == null)
            {
                return NotFound("Conta não encontrada.");
            }

            // Alterar a conta associada à transação
            transacao.ContaId = novaContaId;

            // Salvar as alterações no banco de dados
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/transacoes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Transacao>> GetTransacao(int id)
        {
            var transacao = await _context.Transacoes.Include(t => t.Conta).FirstOrDefaultAsync(t => t.Id == id);

            if (transacao == null)
            {
                return NotFound();
            }

            return transacao;
        }

        // POST: api/transacoes
        [HttpPost]
        public async Task<ActionResult<Transacao>> PostTransacao(Transacao transacao)
        {
            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransacao), new { id = transacao.Id }, transacao);
        }

        // PUT: api/transacoes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransacao(int id, Transacao transacao)
        {
            if (id != transacao.Id)
            {
                return BadRequest();
            }

            _context.Entry(transacao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Transacoes.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/transacoes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransacao(int id)
        {
            var transacao = await _context.Transacoes.FindAsync(id);
            if (transacao == null)
            {
                return NotFound();
            }

            _context.Transacoes.Remove(transacao);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
