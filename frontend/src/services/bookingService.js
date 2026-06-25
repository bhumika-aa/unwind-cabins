import api from './api';

const bookingService = {
  getBookings: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },
  getBooking: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
  createBooking: async (cabinId, data) => {
    const response = await api.post(`/cabins/${cabinId}/bookings`, data);
    return response.data;
  },
  updateBooking: async (id, data) => {
    const response = await api.put(`/bookings/${id}`, data);
    return response.data;
  },
  deleteBooking: async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  }
};

export default bookingService;
