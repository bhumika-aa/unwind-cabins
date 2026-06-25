import api from './api';

const cabinService = {
  getCabins: async (params = '') => {
    const response = await api.get(`/cabins${params}`);
    return response.data;
  },
  
  getCabin: async (id) => {
    const response = await api.get(`/cabins/${id}`);
    return response.data;
  },
  
  createCabin: async (cabinData) => {
    const response = await api.post('/cabins', cabinData);
    return response.data;
  },
  
  updateCabin: async (id, cabinData) => {
    const response = await api.put(`/cabins/${id}`, cabinData);
    return response.data;
  },
  
  deleteCabin: async (id) => {
    const response = await api.delete(`/cabins/${id}`);
    return response.data;
  }
};

export default cabinService;
