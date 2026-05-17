import { Product } from '../../shared/types';

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

export function collectJDProducts(keyword: string): Product[] {
  const basePrice = 2000 + Math.random() * 3000;
  const products: Product[] = [];
  
  for (let i = 0; i < 5; i++) {
    const price = basePrice * (0.9 + Math.random() * 0.3);
    products.push({
      id: `jd_${generateId()}`,
      name: `${keyword} - 京东商品 ${i + 1}`,
      price: parseFloat(price.toFixed(2)),
      originalPrice: parseFloat((price * 1.15).toFixed(2)),
      sales: randomInt(100, 5000),
      shopRating: randomFloat(4.5, 5.0, 1),
      platform: 'jd',
      url: `https://search.jd.com/Search?keyword=${encodeURIComponent(keyword)}`,
      shopName: `京东${['官方旗舰店', '专营店', '专卖店'][randomInt(0, 2)]}`
    });
  }
  return products;
}

export function collectTaobaoProducts(keyword: string): Product[] {
  const basePrice = 1800 + Math.random() * 2800;
  const products: Product[] = [];
  
  for (let i = 0; i < 5; i++) {
    const price = basePrice * (0.85 + Math.random() * 0.35);
    products.push({
      id: `taobao_${generateId()}`,
      name: `${keyword} - 淘宝商品 ${i + 1}`,
      price: parseFloat(price.toFixed(2)),
      originalPrice: parseFloat((price * 1.2).toFixed(2)),
      sales: randomInt(500, 10000),
      shopRating: randomFloat(4.3, 4.9, 1),
      platform: 'taobao',
      url: `https://s.taobao.com/search?q=${encodeURIComponent(keyword)}`,
      shopName: `淘宝${['优品店', '皇冠店', '金牌卖家'][randomInt(0, 2)]}`
    });
  }
  return products;
}

export function collectPinduoduoProducts(keyword: string): Product[] {
  const basePrice = 1500 + Math.random() * 2500;
  const products: Product[] = [];
  
  for (let i = 0; i < 5; i++) {
    const price = basePrice * (0.75 + Math.random() * 0.4);
    products.push({
      id: `pdd_${generateId()}`,
      name: `${keyword} - 拼多多商品 ${i + 1}`,
      price: parseFloat(price.toFixed(2)),
      originalPrice: parseFloat((price * 1.3).toFixed(2)),
      sales: randomInt(1000, 20000),
      shopRating: randomFloat(4.0, 4.8, 1),
      platform: 'pinduoduo',
      url: `https://search.pinduoduo.com/search?key=${encodeURIComponent(keyword)}`,
      shopName: `拼多多${['品牌店', '百亿补贴', '精选好店'][randomInt(0, 2)]}`
    });
  }
  return products;
}

export async function collectAllProducts(keyword: string): Promise<Product[]> {
  return [
    ...collectJDProducts(keyword),
    ...collectTaobaoProducts(keyword),
    ...collectPinduoduoProducts(keyword)
  ];
}

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

export function processProducts(products: Product[]): Product[] {
  let result = cleanProducts(products);
  result = deduplicateProducts(result);
  result = sortProducts(result, 'price');
  return result;
}
