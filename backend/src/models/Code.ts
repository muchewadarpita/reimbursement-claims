import mongoose, { Schema, Document } from 'mongoose';

export interface IPaymentsBySite {
  IPPS: number;
  HOPD: number;
  ASC: number;
  OBL: number;
}

export interface ICode extends Document {
  code: string;
  description: string;
  category: string;
  payments: IPaymentsBySite;
  drg?: string;
  apc?: string;
}

const PaymentsSchema = new Schema<IPaymentsBySite>({
  IPPS: { type: Number, required: true },
  HOPD: { type: Number, required: true },
  ASC: { type: Number, required: true },
  OBL: { type: Number, required: true },
}, { _id: false });

const CodeSchema = new Schema<ICode>({
  code: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    index: 'text',
  },
  category: {
    type: String,
    required: true,
  },
  payments: {
    type: PaymentsSchema,
    required: true,
  },
  drg: {
    type: String,
    required: false,
  },
  apc: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

// Create text index for search
CodeSchema.index({ code: 'text', description: 'text' });

export const Code = mongoose.model<ICode>('Code', CodeSchema);

