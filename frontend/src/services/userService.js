import api from './api';

const userService = {
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  getUser: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  createUser: async (data) => {
    const response = await api.post('/users', data);
    return response.data;
  },
  updateUser: async (id, data) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
  addToWishlist: async (cabinId) => {
    const response = await api.post(`/users/wishlist/${cabinId}`);
    return response.data;
  },
  removeFromWishlist: async (cabinId) => {
    const response = await api.delete(`/users/wishlist/${cabinId}`);
    return response.data;
  }
};

export default userService;
