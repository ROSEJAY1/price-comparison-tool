import { useSearchStore } from '../store/searchStore';
import { ProductCard } from '../components/ProductCard';
import { PriceChart } from '../components/PriceChart';
import { ArrowLeft, BarChart3, ShoppingBag, Star, TrendingUp } from 'lucide-react';
import { calculatePlatformStats, getRecommendations } from '../utils/dataProcessor';

export function Results() {
  const { products, keyword, clearResults } = useSearchStore();
  const platformStats = calculatePlatformStats(products);
  const recommendations = getRecommendations(products);
  const recommendedIds = new Set(recommendations.map(p => p.id));

  const platformNames: Record<string, string> = {
    jd: '京东',
    taobao: '淘宝',
    pinduoduo: '拼多多'
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={clearResults}
            className="flex items-center gap-2 text-gray-600 hover:text-[#165DFF] transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            返回搜索
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                搜索结果：<span className="text-[#165DFF]">{keyword}</span>
              </h1>
              <p className="text-gray-500 mt-1">
                共找到 <span className="font-semibold text-gray-800">{products.length}</span> 个商品
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-6">
                <ShoppingBag className="text-[#165DFF]" size={24} />
                <h2 className="text-xl font-bold text-gray-800">所有商品（按价格排序）</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    isRecommended={recommendedIds.has(product.id)}
                  />
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="text-[#165DFF]" size={24} />
                <h2 className="text-xl font-bold text-gray-800">价格对比</h2>
              </div>
              <PriceChart products={products} />
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-[#165DFF]" size={24} />
                <h2 className="text-xl font-bold text-gray-800">平台统计</h2>
              </div>
              <div className="space-y-4">
                {platformStats.map((stat) => (
                  <div key={stat.platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-gray-800">{platformNames[stat.platform]}</div>
                      <div className="text-sm text-gray-500">{stat.productCount} 个商品</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#165DFF]">¥{stat.avgPrice.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">
                        ¥{stat.minPrice.toFixed(2)} - ¥{stat.maxPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Star className="text-yellow-500" size={24} fill="currentColor" />
                <h2 className="text-xl font-bold text-gray-800">性价比推荐</h2>
              </div>
              <div className="space-y-3">
                {recommendations.map((product, index) => (
                  <div key={product.id} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-white text-xs font-bold">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 text-sm truncate">{product.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-red-500 font-bold">¥{product.price.toFixed(2)}</span>
                        <span className="text-xs text-gray-500">{platformNames[product.platform]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
