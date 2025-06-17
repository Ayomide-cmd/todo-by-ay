import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const fetchTodo = async (id: string) => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return res.data;
};

export default function TodoDetailPage() {
  const { id } = useParams();

  const { data: todo, isLoading, isError } = useQuery<Todo>({
    queryKey: ['todo', id],
    queryFn: () => fetchTodo(id!),
  });

  if (isLoading) return <p className="p-4">Loading todo...</p>;
  if (isError || !todo) return <p className="p-4 text-red-500">Todo not found.</p>;

  return (
    <motion.div
      className="p-4 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold mb-4">Todo Details</h2>
      <p><strong>ID:</strong> {todo.id}</p>
      <p><strong>User ID:</strong> {todo.userId}</p>
      <p><strong>Title:</strong> {todo.title}</p>
      <p>
        <strong>Status:</strong>{' '}
        {todo.completed ? '✅ Completed' : '❌ Incomplete'}
      </p>

      <Link to="/todos" className="inline-block mt-4 text-blue-600 hover:underline">
        ← Back to Todos
      </Link>
    </motion.div>
  );
}
