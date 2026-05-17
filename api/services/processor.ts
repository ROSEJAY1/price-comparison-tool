import { Product, PlatformStats } from '../../shared/types';

export function cleanProducts(products: Product[]): Product[] {
  return products.filter(product => 
    product.name && 
    product.price > 0 && 
    product.shopRating >= 0 &&
    product.shopRating <= 5
  ).map(product => ({
    ...product,
    name: product.name.trim()
  }));
}

export function deduplicateProducts(products: Product[]): Product[] {
  const seen = new Set<string>();
  return products.filter(product => {
    const key = `${product.platform}-${product.name.substring(0, 30)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function sortProducts(products: Product[], sortBy: 'price' | 'sales' | 'rating' = 'price'): Product[] {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'sales':
        return b.sales - a.sales;
      case 'rating':
        return b.shopRating - a.shopRating;
      default:
        return a.price - b.price;
    }
  });
}

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
  const sortedByPrice = sortProducts(products, 'price');
  const sortedByRating = sortProducts(products, 'rating');
  
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

export function processProducts(products: Product[]): Product[] {
  let result = cleanProducts(products);
  result = deduplicateProducts(result);
  result = sortProducts(result, 'price');
  return result;
}
