import { create } from 'zustand';
import { Product } from '../../shared/types';
import { collectAllProducts, processProducts } from '../services/mockData';

interface SearchStore {
  products: Product[];
  keyword: string;
  isLoading: boolean;
  error: string | null;
  search: (keyword: string) => Promise<void>;
  clearResults: () => void;
  setDemoData: () => void;
}

const demoKeyword = 'iPhone 15';

const demoProducts: Product[] = [
  { id: 'jd_1', name: 'iPhone 15 - 京东商品 1', price: 4999.00, originalPrice: 5799.00, sales: 2856, shopRating: 4.8, platform: 'jd', url: 'https://search.jd.com/Search?keyword=iPhone%2015', shopName: '京东官方旗舰店' },
  { id: 'jd_2', name: 'iPhone 15 - 京东商品 2', price: 5199.00, originalPrice: 5999.00, sales: 1823, shopRating: 4.9, platform: 'jd', url: 'https://search.jd.com/Search?keyword=iPhone%2015', shopName: '京东专营店' },
  { id: 'taobao_1', name: 'iPhone 15 - 淘宝商品 1', price: 4799.00, originalPrice: 5759.00, sales: 5689, shopRating: 4.7, platform: 'taobao', url: 'https://s.taobao.com/search?q=iPhone%2015', shopName: '淘宝优品店' },
  { id: 'taobao_2', name: 'iPhone 15 - 淘宝商品 2', price: 4899.00, originalPrice: 5879.00, sales: 4231, shopRating: 4.6, platform: 'taobao', url: 'https://s.taobao.com/search?q=iPhone%2015', shopName: '淘宝皇冠店' },
  { id: 'pdd_1', name: 'iPhone 15 - 拼多多商品 1', price: 4599.00, originalPrice: 5979.00, sales: 12567, shopRating: 4.5, platform: 'pinduoduo', url: 'https://search.pinduoduo.com/search?key=iPhone%2015', shopName: '拼多多品牌店' },
  { id: 'pdd_2', name: 'iPhone 15 - 拼多多商品 2', price: 4699.00, originalPrice: 6109.00, sales: 9876, shopRating: 4.4, platform: 'pinduoduo', url: 'https://search.pinduoduo.com/search?key=iPhone%2015', shopName: '拼多多百亿补贴' }
];

export const useSearchStore = create<SearchStore>((set) => ({
  products: [],
  keyword: '',
  isLoading: false,
  error: null,
  
  search: async (keyword: string) => {
    set({ isLoading: true, error: null, keyword });
    try {
      const rawProducts = await collectAllProducts(keyword);
      const processedProducts = processProducts(rawProducts);
      set({ products: processedProducts, isLoading: false });
    } catch (err) {
      set({ error: '搜索出错了', isLoading: false });
    }
  },
  
  clearResults: () => set({ products: [], keyword: '', error: null }),
  
  setDemoData: () => set({ products: demoProducts, keyword: demoKeyword, isLoading: false, error: null })
}));
