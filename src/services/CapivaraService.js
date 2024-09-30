import axios from 'axios';

const API_URL = 'http://localhost:5001/capivaras';  // URL do backend

export default {
  async getCapivaras() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar as capivaras:', error);
      throw error;
    }
  }
};
