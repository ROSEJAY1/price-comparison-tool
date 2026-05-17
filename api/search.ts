import { VercelRequest, VercelResponse } from '@vercel/node';
import { collectAllProducts } from './api/services/collector';
import { processProducts } from './api/services/processor';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

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

    res.json({
      success: true,
      data: processedProducts,
      timestamp: Date.now(),
      keyword
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
