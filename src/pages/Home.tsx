import { useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { useSearchStore } from '../store/searchStore';
import { Search, BarChart3, Zap, Star, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: '多平台搜索',
    description: '同时搜索京东、淘宝、拼多多三大主流电商平台，轻松找到心仪商品'
  },
  {
    icon: BarChart3,
    title: '智能价格对比',
    description: '自动汇总各平台价格信息，可视化展示价格趋势，让您一目了然'
  },
  {
    icon: Zap,
    title: '快速高效',
    description: '一键搜索，即时获取结果，节省您的宝贵时间'
  },
  {
    icon: Star,
    title: '性价比推荐',
    description: '智能算法分析价格、销量、评分，为您推荐最具性价比的选择'
  }
];

export function Home() {
  const { search, isLoading, products, setDemoData } = useSearchStore();

  useEffect(() => {
    if (products.length === 0) {
      setDemoData();
    }
  }, [products.length, setDemoData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <section className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            电商价格<span className="text-[#165DFF]">智能对比</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            一键搜索京东、淘宝、拼多多，智能比价，帮您找到最划算的商品
          </p>
          
          <div className="flex justify-center mb-8">
            <SearchBar onSearch={search} isLoading={isLoading} />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => search('iPhone 15')}
              className="px-6 py-2 bg-white text-gray-700 rounded-full border border-gray-200 hover:border-[#165DFF] hover:text-[#165DFF] transition-all text-sm"
            >
              iPhone 15
            </button>
            <button
              onClick={() => search('Nike运动鞋')}
              className="px-6 py-2 bg-white text-gray-700 rounded-full border border-gray-200 hover:border-[#165DFF] hover:text-[#165DFF] transition-all text-sm"
            >
              Nike运动鞋
            </button>
            <button
              onClick={() => search('AirPods Pro')}
              className="px-6 py-2 bg-white text-gray-700 rounded-full border border-gray-200 hover:border-[#165DFF] hover:text-[#165DFF] transition-all text-sm"
            >
              AirPods Pro
            </button>
          </div>
        </section>

        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-[#165DFF]/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="text-[#165DFF]" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {products.length > 0 && (
          <section className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">数据示例</h2>
                <p className="text-gray-500 mt-2">查看 "iPhone 15" 的搜索结果示例</p>
              </div>
              <button
                onClick={() => search('iPhone 15')}
                className="flex items-center gap-2 px-6 py-3 bg-[#165DFF] text-white rounded-xl font-medium hover:bg-[#0e4bd6] transition-all"
              >
                查看完整结果
                <ArrowRight size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.slice(0, 3).map((product, index) => (
                <div key={product.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#165DFF] text-white text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-xs text-gray-500">
                      {product.platform === 'jd' ? '京东' : product.platform === 'taobao' ? '淘宝' : '拼多多'}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h4>
                  <div className="text-2xl font-bold text-red-500">¥{product.price.toFixed(2)}</div>
                  <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
                    <span>销量：{product.sales.toLocaleString()}</span>
                    <span>评分：{product.shopRating.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
