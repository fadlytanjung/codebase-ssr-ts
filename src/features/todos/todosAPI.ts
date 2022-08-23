export async function fetchTodos(todo = 'todo'): Promise<{ data: string }> {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todo }),
  })
  const result = await response.json();

  return result;
}
