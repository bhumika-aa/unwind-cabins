import api from './api';

const miscService = {
  submitContact: async (data) => {
    const response = await api.post('/contact', data);
    return response.data;
  },
  
  subscribeNewsletter: async (email) => {
    const response = await api.post('/newsletter', { email });
    return response.data;
  },

  getMessages: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  deleteMessage: async (id) => {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  },

  getSubscribers: async () => {
    const response = await api.get('/newsletter');
    return response.data;
  },

  deleteSubscriber: async (id) => {
    const response = await api.delete(`/newsletter/${id}`);
    return response.data;
  }
};

export default miscService;
