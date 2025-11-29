import { describe, it, expect } from 'vitest';
import { codeService } from '../codeService';

describe('codeService', () => {
  describe('listCodes', () => {
    it('should return all codes', () => {
      const codes = codeService.listCodes();
      expect(codes.length).toBeGreaterThan(0);
      expect(codes[0]).toHaveProperty('code');
      expect(codes[0]).toHaveProperty('description');
      expect(codes[0]).toHaveProperty('category');
    });
  });

  describe('getCodeDetail', () => {
    it('should return code detail for valid code', () => {
      const detail = codeService.getCodeDetail('36903');
      expect(detail).not.toBeNull();
      expect(detail?.code).toBe('36903');
      expect(detail?.description).toBeTruthy();
      expect(detail?.payments).toHaveProperty('IPPS');
      expect(detail?.payments).toHaveProperty('HOPD');
      expect(detail?.payments).toHaveProperty('ASC');
      expect(detail?.payments).toHaveProperty('OBL');
    });

    it('should return null for invalid code', () => {
      const detail = codeService.getCodeDetail('INVALID');
      expect(detail).toBeNull();
    });
  });

  describe('searchCodes', () => {
    it('should find codes by code number', () => {
      const results = codeService.searchCodes('36903');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].code).toBe('36903');
    });

    it('should find codes by description', () => {
      const results = codeService.searchCodes('stent');
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.some((r) => r.description.toLowerCase().includes('stent'))
      ).toBe(true);
    });

    it('should be case insensitive', () => {
      const results = codeService.searchCodes('DIALYSIS');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should return empty array for no matches', () => {
      const results = codeService.searchCodes('NONEXISTENT123456');
      expect(results.length).toBe(0);
    });
  });
});
