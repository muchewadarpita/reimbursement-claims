import {
  ReimbursementScenarioRequest,
  ReimbursementScenarioResponse,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const reimbursementService = {
  async calculateScenario(
    request: ReimbursementScenarioRequest
  ): Promise<ReimbursementScenarioResponse | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/reimbursement/scenario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to calculate scenario');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error calculating scenario:', error);
      throw error;
    }
  },
};
