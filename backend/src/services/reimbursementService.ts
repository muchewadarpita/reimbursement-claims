import { ICode } from '../models/Code';

export type SiteOfService = 'IPPS' | 'HOPD' | 'ASC' | 'OBL';
export type Classification = 'profitable' | 'break-even' | 'loss';

export interface ReimbursementScenarioRequest {
  code: string;
  siteOfService: SiteOfService;
  deviceCost: number;
  ntapAddOn?: number;
}

export interface ReimbursementScenarioResponse {
  basePayment: number;
  addOnPayment: number;
  totalPayment: number;
  margin: number;
  classification: Classification;
}

const MARGIN_THRESHOLDS = {
  PROFITABLE_MIN: 1000,
  BREAK_EVEN_MIN: -500,
};

export const reimbursementService = {
  calculateScenario(
    codeDetail: ICode,
    request: ReimbursementScenarioRequest
  ): ReimbursementScenarioResponse {
    const basePayment = codeDetail.payments[request.siteOfService];
    const addOnPayment = request.ntapAddOn || 0;
    const totalPayment = basePayment + addOnPayment;
    const margin = totalPayment - request.deviceCost;

    const classification = this.classifyScenario(margin);

    return {
      basePayment,
      addOnPayment,
      totalPayment,
      margin,
      classification,
    };
  },

  classifyScenario(margin: number): Classification {
    if (margin >= MARGIN_THRESHOLDS.PROFITABLE_MIN) {
      return 'profitable';
    } else if (margin >= MARGIN_THRESHOLDS.BREAK_EVEN_MIN) {
      return 'break-even';
    } else {
      return 'loss';
    }
  },
};

export { MARGIN_THRESHOLDS };

