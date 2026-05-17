import { Router, Request, Response } from 'express';
import { collectAllProducts } from '../services/collector';
import { processProducts } from '../services/processor';
import { SearchResponse } from '../../shared/types';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { keyword } = req.body;
    
    if (!keyword || typeof keyword !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Keyword is required'
      });
    }

    const rawProducts = await collectAllProducts(keyword);
    const processedProducts = processProducts(rawProducts);

    const response: SearchResponse = {
      success: true,
      data: processedProducts,
      timestamp: Date.now(),
      keyword
    };

    res.json(response);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;
