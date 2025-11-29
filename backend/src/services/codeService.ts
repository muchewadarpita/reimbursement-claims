import { Code, ICode } from '../models/Code';

export const codeService = {
  async listCodes() {
    const codes = await Code.find({}, 'code description category').lean();
    return codes;
  },

  async getCodeByCode(code: string): Promise<ICode | null> {
    const codeDoc = await Code.findOne({ code }).lean();
    return codeDoc as ICode | null;
  },

  async searchCodes(query: string) {
    const codes = await Code.find(
      {
        $or: [
          { code: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
        ],
      },
      'code description category'
    ).lean();
    return codes;
  },
};

