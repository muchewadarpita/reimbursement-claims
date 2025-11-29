import { Router, Request, Response } from 'express';
import { codeService } from '../services/codeService';

const router = Router();

// GET /api/codes - List all codes
router.get('/', async (req: Request, res: Response) => {
  try {
    const codes = await codeService.listCodes();
    res.json(codes);
  } catch (error) {
    console.error('Error listing codes:', error);
    res.status(500).json({ error: 'Failed to fetch codes' });
  }
});

// GET /api/codes/search?q=query - Search codes
// IMPORTANT: This must come before /:code route to avoid matching "search" as a code
router.get('/search', async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;

    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const codes = await codeService.searchCodes(query.trim());
    res.json(codes);
  } catch (error) {
    console.error('Error searching codes:', error);
    res.status(500).json({ error: 'Failed to search codes' });
  }
});

// GET /api/codes/:code - Get code detail
router.get('/:code', async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const codeDetail = await codeService.getCodeByCode(code);

    if (!codeDetail) {
      return res.status(404).json({ error: 'Code not found' });
    }

    res.json(codeDetail);
  } catch (error) {
    console.error('Error fetching code detail:', error);
    res.status(500).json({ error: 'Failed to fetch code detail' });
  }
});

export default router;

