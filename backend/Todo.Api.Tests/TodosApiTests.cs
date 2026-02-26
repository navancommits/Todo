using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Todo.Api.Tests;

public sealed class TodosApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public TodosApiTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Post_then_Get_returns_created_item()
    {
        var post = await _client.PostAsJsonAsync("/api/todos", new { title = "Buy milk" });
        Assert.Equal(HttpStatusCode.Created, post.StatusCode);

        var list = await _client.GetFromJsonAsync<List<TodoDto>>("/api/todos");
        Assert.NotNull(list);
        Assert.Contains(list!, x => x.title == "Buy milk");
    }

    [Fact]
    public async Task Delete_returns_404_for_unknown_id()
    {
        var resp = await _client.DeleteAsync($"/api/todos/{Guid.NewGuid()}");
        Assert.Equal(HttpStatusCode.NotFound, resp.StatusCode);
    }

    private sealed record TodoDto(Guid id, string title, DateTimeOffset createdAt);
}