import axios from 'axios';

// Get user token safely
const user = JSON.parse(localStorage.getItem('todoapp'));
const token = user?.token;

if (token) {
  // Set default auth header only if token exists
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  console.warn("No token found in localStorage — API requests may fail.");
}

// Create todo
const createTodo = (data) => {
  return axios.post('/api/v1/todo/create', data);
};

// Get all todos
const getAllTodo = (id) => {
  return axios.post(`/api/v1/todo/getAll/${id}`);
};

// Update todo
const updateTodo = (id, data) => {
  return axios.patch(`/api/v1/todo/update/${id}`, data);
};

// Delete todo
const deleteTodo = (id) => {
  return axios.post(`/api/v1/todo/delete/${id}`);
};

const TodoServices = { createTodo, getAllTodo, updateTodo, deleteTodo };
export default TodoServices;
