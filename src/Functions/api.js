import axios from 'axios';

export const createTaskApi = async (title, description) => {
  try {
    const { data } = await axios.post(`http://localhost:8080/api/v1/todo`, {
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
    const { data } = await axios.delete(`http://localhost:8080/api/v1/todo/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTaskApi = async (id, title, description) => {
  try {
    const { data } = await axios.put(`http://localhost:8080/api/v1/todo/${id}`, {
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
    const { data } = await axios.get(`http://localhost:8080/api/v1/todos`);
    return data;
  } catch (error) {
    throw error;
  }
};
