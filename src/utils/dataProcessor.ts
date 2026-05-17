import { Product, PlatformStats } from '../../shared/types';

export function calculatePlatformStats(products: Product[]): PlatformStats[] {
  const stats: Record<string, { total: number; count: number; min: number; max: number }> = {};
  
  products.forEach(product => {
    if (!stats[product.platform]) {
      stats[product.platform] = { total: 0, count: 0, min: Infinity, max: -Infinity };
    }
    stats[product.platform].total += product.price;
    stats[product.platform].count += 1;
    stats[product.platform].min = Math.min(stats[product.platform].min, product.price);
    stats[product.platform].max = Math.max(stats[product.platform].max, product.price);
  });
  
  return Object.entries(stats).map(([platform, data]) => ({
    platform: platform as any,
    avgPrice: parseFloat((data.total / data.count).toFixed(2)),
    minPrice: data.min,
    maxPrice: data.max,
    productCount: data.count
  }));
}

export function getRecommendations(products: Product[]): Product[] {
  const scored = products.map(product => {
    const priceScore = 1 - (product.price / Math.max(...products.map(p => p.price)));
    const ratingScore = product.shopRating / 5;
    const salesScore = Math.min(1, product.sales / 10000);
    const totalScore = (priceScore * 0.4) + (ratingScore * 0.4) + (salesScore * 0.2);
    return { product, score: totalScore };
  });
  
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map(s => s.product);
}
