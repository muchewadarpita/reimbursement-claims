import { describe, it, expect } from 'vitest';
import { reimbursementService, MARGIN_THRESHOLDS } from '../reimbursementService';
import { ICode } from '../../models/Code';

describe('reimbursementService', () => {
  const mockCode: ICode = {
    code: '36903',
    description: 'Test code',
    category: 'Test',
    payments: {
      IPPS: 10000,
      HOPD: 9000,
      ASC: 7000,
      OBL: 4000,
    },
  } as ICode;

  describe('calculateScenario', () => {
    it('should calculate scenario correctly without NTAP add-on', () => {
      const request = {
        code: '36903',
        siteOfService: 'HOPD' as const,
        deviceCost: 5000,
      };

      const result = reimbursementService.calculateScenario(mockCode, request);

      expect(result.basePayment).toBe(9000);
      expect(result.addOnPayment).toBe(0);
      expect(result.totalPayment).toBe(9000);
      expect(result.margin).toBe(4000);
      expect(result.classification).toBe('profitable');
    });

    it('should calculate scenario correctly with NTAP add-on', () => {
      const request = {
        code: '36903',
        siteOfService: 'HOPD' as const,
        deviceCost: 10000,
        ntapAddOn: 2000,
      };

      const result = reimbursementService.calculateScenario(mockCode, request);

      expect(result.basePayment).toBe(9000);
      expect(result.addOnPayment).toBe(2000);
      expect(result.totalPayment).toBe(11000);
      expect(result.margin).toBe(1000);
      expect(result.classification).toBe('profitable');
    });

    it('should classify as profitable when margin >= PROFITABLE_MIN', () => {
      const request = {
        code: '36903',
        siteOfService: 'HOPD' as const,
        deviceCost: 8000,
      };

      const result = reimbursementService.calculateScenario(mockCode, request);
      expect(result.classification).toBe('profitable');
    });

    it('should classify as break-even when margin is between BREAK_EVEN_MIN and PROFITABLE_MIN', () => {
      const request = {
        code: '36903',
        siteOfService: 'HOPD' as const,
        deviceCost: 9500,
      };

      const result = reimbursementService.calculateScenario(mockCode, request);
      expect(result.classification).toBe('break-even');
    });

    it('should classify as loss when margin < BREAK_EVEN_MIN', () => {
      const request = {
        code: '36903',
        siteOfService: 'HOPD' as const,
        deviceCost: 10000,
      };

      const result = reimbursementService.calculateScenario(mockCode, request);
      expect(result.classification).toBe('loss');
    });
  });

  describe('classifyScenario', () => {
    it('should return profitable for margin >= PROFITABLE_MIN', () => {
      expect(reimbursementService.classifyScenario(MARGIN_THRESHOLDS.PROFITABLE_MIN)).toBe('profitable');
      expect(reimbursementService.classifyScenario(2000)).toBe('profitable');
    });

    it('should return break-even for margin between thresholds', () => {
      expect(reimbursementService.classifyScenario(MARGIN_THRESHOLDS.BREAK_EVEN_MIN)).toBe('break-even');
      expect(reimbursementService.classifyScenario(0)).toBe('break-even');
      expect(reimbursementService.classifyScenario(500)).toBe('break-even');
    });

    it('should return loss for margin < BREAK_EVEN_MIN', () => {
      expect(reimbursementService.classifyScenario(MARGIN_THRESHOLDS.BREAK_EVEN_MIN - 1)).toBe('loss');
      expect(reimbursementService.classifyScenario(-1000)).toBe('loss');
    });
  });
});

