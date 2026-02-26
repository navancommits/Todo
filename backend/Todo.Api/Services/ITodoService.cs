using Todo.Api.Models;

namespace Todo.Api.Services;

public interface ITodoService
{
    IReadOnlyList<TodoItem> GetAll();
    TodoItem Create(string title);
    bool Delete(Guid id);
}