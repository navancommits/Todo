using Microsoft.AspNetCore.Mvc;
using Todo.Api.Contracts;
using Todo.Api.Models;
using Todo.Api.Services;

namespace Todo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class TodosController : ControllerBase
{
    private readonly ITodoService _service;

    public TodosController(ITodoService service) => _service = service;

    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<TodoItem>), StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<TodoItem>> GetAll() => Ok(_service.GetAll());

    [HttpPost]
    [ProducesResponseType(typeof(TodoItem), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<TodoItem> Create([FromBody] CreateTodoRequest request)
    {
        try
        {
            var created = _service.Create(request.Title);
            return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
        }
        catch (ArgumentException ex)
        {
            return ValidationProblem(new ValidationProblemDetails
            {
                Title = "Validation failed",
                Detail = ex.Message
            });
        }
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult Delete(Guid id)
    {
        var removed = _service.Delete(id);
        return removed ? NoContent() : NotFound();
    }
}