import { CodeDetail, CodeSummary } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const codeService = {
  async listCodes(): Promise<CodeSummary[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/codes`);
      if (!response.ok) {
        throw new Error('Failed to fetch codes');
      }
      const codes = await response.json();
      return codes.map((c: CodeDetail) => ({
        code: c.code,
        description: c.description,
        category: c.category,
      }));
    } catch (error) {
      console.error('Error fetching codes:', error);
      throw error;
    }
  },

  async getCodeDetail(code: string): Promise<CodeDetail | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/codes/${code}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch code detail');
      }
      const codeDetail = await response.json();
      return codeDetail;
    } catch (error) {
      console.error('Error fetching code detail:', error);
      return null;
    }
  },

  async searchCodes(query: string): Promise<CodeSummary[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/codes/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search codes');
      }
      const codes = await response.json();
      return codes.map((c: CodeDetail) => ({
        code: c.code,
        description: c.description,
        category: c.category,
      }));
    } catch (error) {
      console.error('Error searching codes:', error);
      throw error;
    }
  },
};
