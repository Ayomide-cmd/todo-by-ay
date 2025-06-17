
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoListPage from './pages/TodoList';
import TodoDetailPage from './pages/TodoDetail'; // Make sure this file exists
import NotFound from './pages/NotFound'; // Make sure this file exists

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/todos/:id" element={<TodoDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
