import { describe, it, expect } from 'vitest';
import { reimbursementService, MARGIN_THRESHOLDS } from '../reimbursementService';

describe('reimbursementService', () => {
  describe('calculateScenario', () => {
    it('should calculate reimbursement scenario correctly', () => {
      const result = reimbursementService.calculateScenario({
        code: '36903',
        siteOfService: 'HOPD',
        deviceCost: 5800,
        ntapAddOn: 3770,
      });

      expect(result).not.toBeNull();
      expect(result?.basePayment).toBe(11639);
      expect(result?.addOnPayment).toBe(3770);
      expect(result?.totalPayment).toBe(15409);
      expect(result?.margin).toBe(9609);
      expect(result?.classification).toBe('profitable');
    });

    it('should calculate without NTAP add-on', () => {
      const result = reimbursementService.calculateScenario({
        code: '36903',
        siteOfService: 'ASC',
        deviceCost: 4000,
      });

      expect(result).not.toBeNull();
      expect(result?.basePayment).toBe(7650);
      expect(result?.addOnPayment).toBe(0);
      expect(result?.totalPayment).toBe(7650);
      expect(result?.margin).toBe(3650);
      expect(result?.classification).toBe('profitable');
    });

    it('should return null for invalid code', () => {
      const result = reimbursementService.calculateScenario({
        code: 'INVALID',
        siteOfService: 'HOPD',
        deviceCost: 5000,
      });

      expect(result).toBeNull();
    });

    it('should calculate different sites of service correctly', () => {
      const ippsResult = reimbursementService.calculateScenario({
        code: '36903',
        siteOfService: 'IPPS',
        deviceCost: 5000,
      });

      const oblResult = reimbursementService.calculateScenario({
        code: '36903',
        siteOfService: 'OBL',
        deviceCost: 5000,
      });

      expect(ippsResult?.basePayment).toBe(12485);
      expect(oblResult?.basePayment).toBe(3845);
      expect(ippsResult?.margin).toBeGreaterThan(oblResult?.margin!);
    });
  });

  describe('classifyScenario', () => {
    it('should classify profitable scenarios', () => {
      const result = reimbursementService.classifyScenario(5000);
      expect(result).toBe('profitable');
    });

    it('should classify profitable at threshold', () => {
      const result = reimbursementService.classifyScenario(
        MARGIN_THRESHOLDS.PROFITABLE_MIN
      );
      expect(result).toBe('profitable');
    });

    it('should classify break-even scenarios', () => {
      const result = reimbursementService.classifyScenario(0);
      expect(result).toBe('break-even');
    });

    it('should classify break-even at upper threshold', () => {
      const result = reimbursementService.classifyScenario(
        MARGIN_THRESHOLDS.PROFITABLE_MIN - 1
      );
      expect(result).toBe('break-even');
    });

    it('should classify break-even at lower threshold', () => {
      const result = reimbursementService.classifyScenario(
        MARGIN_THRESHOLDS.BREAK_EVEN_MIN
      );
      expect(result).toBe('break-even');
    });

    it('should classify loss scenarios', () => {
      const result = reimbursementService.classifyScenario(-1000);
      expect(result).toBe('loss');
    });

    it('should classify loss at threshold', () => {
      const result = reimbursementService.classifyScenario(
        MARGIN_THRESHOLDS.BREAK_EVEN_MIN - 1
      );
      expect(result).toBe('loss');
    });
  });
});
