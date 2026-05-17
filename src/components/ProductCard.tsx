import { Product } from '../../shared/types';
import { PlatformBadge } from './PlatformBadge';
import { Star, ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index: number;
  isRecommended?: boolean;
}

export function ProductCard({ product, index, isRecommended }: ProductCardProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all ${isRecommended ? 'ring-2 ring-yellow-400 bg-yellow-50/30' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#165DFF] text-white text-sm font-bold">
            {index + 1}
          </span>
          <PlatformBadge platform={product.platform} />
          {isRecommended && (
            <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs font-medium">
              <Star size={12} fill="currentColor" />
              推荐
            </span>
          )}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
        {product.name}
      </h3>
      
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-2xl font-bold text-red-500">
          ¥{product.price.toFixed(2)}
        </span>
        {product.originalPrice && (
          <span className="text-sm text-gray-400 line-through">
            ¥{product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Star size={14} fill="#fbbf24" className="text-yellow-400" />
          <span>{product.shopRating.toFixed(1)}</span>
        </div>
        <div>销量：{product.sales.toLocaleString()}</div>
        <div>店铺：{product.shopName}</div>
      </div>
      
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
      >
        查看详情
        <ExternalLink size={14} />
      </a>
    </div>
  );
}
