import api from './api';

const experienceService = {
  getExperiences: async () => {
    const response = await api.get('/experiences');
    return response.data;
  },
  getExperience: async (id) => {
    const response = await api.get(`/experiences/${id}`);
    return response.data;
  },
  createExperience: async (data) => {
    const response = await api.post('/experiences', data);
    return response.data;
  },
  updateExperience: async (id, data) => {
    const response = await api.put(`/experiences/${id}`, data);
    return response.data;
  },
  deleteExperience: async (id) => {
    const response = await api.delete(`/experiences/${id}`);
    return response.data;
  }
};

export default experienceService;
