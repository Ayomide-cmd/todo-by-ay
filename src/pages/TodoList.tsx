import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import AddTodo from '../components/Addtodo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const fetchTodos = async () => {
  const res = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  return res.data;
};

const updateTodo = async (updatedTodo: Todo) => {
  await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo);
  return updatedTodo;
};

export default function TodoListPage() {
  const queryClient = useQueryClient();
  const { data: todos = [], isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const itemsPerPage = 10;

  const mutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setEditId(null);
      setEditTitle('');
    },
  });

  const filtered = todos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'incomplete' && !todo.completed);
    return matchesSearch && matchesStatus;
  });

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const startEdit = (todo: Todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
  };

  const saveEdit = (todo: Todo) => {
    if (editTitle.trim() !== '') {
      mutation.mutate({ ...todo, title: editTitle });
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>

      <AddTodo />

      <div className="flex flex-col sm:flex-row gap-4 mb-4 mt-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search todos"
          aria-label="Search todos"
          className="border p-2 rounded w-full"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading todos</p>
      ) : (
        <ul>
          {paginated.map((todo) => (
            <li key={todo.id} className="mb-2 flex justify-between items-center gap-2">
              <div className="flex-1">
                {editId === todo.id ? (
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  <Link to={`/todos/${todo.id}`} className="text-blue-600 hover:underline">
                    {todo.title}
                  </Link>
                )}
              </div>
              <span>{todo.completed ? '✅' : '❌'}</span>
              {editId === todo.id ? (
                <button
                  onClick={() => saveEdit(todo)}
                  className="text-sm px-2 py-1 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEdit(todo)}
                  className="text-sm px-2 py-1 bg-yellow-400 rounded"
                >
                  Edit
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}

