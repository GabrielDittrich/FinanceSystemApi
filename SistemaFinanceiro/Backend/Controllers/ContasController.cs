using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")] // Define a rota base para o controlador
    [ApiController] // Marca o controlador como um controlador de API
    public class ContasController : ControllerBase
    {
        private readonly FinanceContext _context;

        public ContasController(FinanceContext context)
        {
            _context = context;
        }

        // GET: api/contas
        [HttpGet] // A ação GET será mapeada para "api/contas"
        public async Task<ActionResult<IEnumerable<Conta>>> GetContas()
        {
            return await _context.Contas.ToListAsync();
        }

        // POST: api/contas
        [HttpPost] // A ação POST será mapeada para "api/contas"
        public async Task<ActionResult<Conta>> PostConta(Conta conta)
        {
            _context.Contas.Add(conta);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetContas), new { id = conta.Id }, conta);
        }
    }
}
