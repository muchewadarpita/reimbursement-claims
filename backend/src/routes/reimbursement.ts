import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { codeService } from '../services/codeService';
import { reimbursementService, ReimbursementScenarioRequest } from '../services/reimbursementService';

const router = Router();

const scenarioRequestSchema = z.object({
  code: z.string().min(1),
  siteOfService: z.enum(['IPPS', 'HOPD', 'ASC', 'OBL']),
  deviceCost: z.number().min(0),
  ntapAddOn: z.number().min(0).optional(),
});

// POST /api/reimbursement/scenario - Calculate reimbursement scenario
router.post('/scenario', async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validationResult = scenarioRequestSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: validationResult.error.errors,
      });
    }

    const request: ReimbursementScenarioRequest = validationResult.data;

    // Get code detail
    const codeDetail = await codeService.getCodeByCode(request.code);

    if (!codeDetail) {
      return res.status(404).json({ error: 'Code not found' });
    }

    // Calculate scenario
    const result = reimbursementService.calculateScenario(codeDetail, request);

    res.json(result);
  } catch (error) {
    console.error('Error calculating scenario:', error);
    res.status(500).json({ error: 'Failed to calculate reimbursement scenario' });
  }
});

export default router;

