import axios from 'axios';

export const createTaskApi = async (title, description) => {
  try {
    const { data } = await axios.post(`https://wendor-backend.onrender.com/get/todo`, {
      title,
      description,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteTaskApi = async (id) => {
  try {
    const { data } = await axios.delete(`https://wendor-backend.onrender.com/get/todo/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTaskApi = async (id, title, description) => {
  try {
    const { data } = await axios.put(`https://wendor-backend.onrender.com/get/todo/${id}`, {
      title,
      description,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const loadTasksApi = async () => {
  try {
    const { data } = await axios.get(`https://wendor-backend.onrender.com/get/todos`);
    return data;
  } catch (error) {
    throw error;
  }
};
