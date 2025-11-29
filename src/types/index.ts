export type SiteOfService = 'IPPS' | 'HOPD' | 'ASC' | 'OBL';

export type Classification = 'profitable' | 'break-even' | 'loss';

export interface PaymentsBySite {
  IPPS: number;
  HOPD: number;
  ASC: number;
  OBL: number;
}

export interface CodeSummary {
  code: string;
  description: string;
  category: string;
}

export interface CodeDetail extends CodeSummary {
  payments: PaymentsBySite;
  drg?: string;
  apc?: string;
}

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
