import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchTodoById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
