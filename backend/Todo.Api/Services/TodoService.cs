using Todo.Api.Models;
using Todo.Api.Repositories;

namespace Todo.Api.Services;

public sealed class TodoService : ITodoService
{
    private readonly ITodoRepository _repo;

    public TodoService(ITodoRepository repo) => _repo = repo;

    public IReadOnlyList<TodoItem> GetAll() => _repo.GetAll();

    public TodoItem Create(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Title is required.", nameof(title));

        if (title.Trim().Length > 200)
            throw new ArgumentException("Title must be 200 characters or less.", nameof(title));

        return _repo.Add(title);
    }

    public bool Delete(Guid id) => _repo.Delete(id);
}