import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="输入商品关键词，如：iPhone 15、Nike运动鞋..."
          className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-[#165DFF] focus:outline-none focus:ring-4 focus:ring-[#165DFF]/10 transition-all shadow-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !keyword.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#165DFF] text-white px-8 py-2.5 rounded-full font-medium hover:bg-[#0e4bd6] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Search size={20} />
          {isLoading ? '搜索中...' : '搜索'}
        </button>
      </div>
    </form>
  );
}
