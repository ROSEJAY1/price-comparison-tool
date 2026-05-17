export type Platform = 'jd' | 'taobao' | 'pinduoduo';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  sales: number;
  shopRating: number;
  platform: Platform;
  url: string;
  image?: string;
  shopName: string;
}

export interface SearchRequest {
  keyword: string;
}

export interface SearchResponse {
  success: boolean;
  data: Product[];
  timestamp: number;
  keyword: string;
}

export interface PlatformStats {
  platform: Platform;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  productCount: number;
}
