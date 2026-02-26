using System.Collections.Concurrent;
using Todo.Api.Models;

namespace Todo.Api.Repositories;

public sealed class InMemoryTodoRepository : ITodoRepository
{
    private readonly ConcurrentDictionary<Guid, TodoItem> _items = new();

    public IReadOnlyList<TodoItem> GetAll() =>
        _items.Values
              .OrderByDescending(x => x.CreatedAt)
              .ToList();

    public TodoItem Add(string title)
    {
        var item = new TodoItem(Guid.NewGuid(), title.Trim(), DateTimeOffset.UtcNow);
        _items[item.Id] = item;
        return item;
    }

    public bool Delete(Guid id) => _items.TryRemove(id, out _);
}