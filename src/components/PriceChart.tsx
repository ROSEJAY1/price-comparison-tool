import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Product, Platform } from '../../shared/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PriceChartProps {
  products: Product[];
}

const platformColors: Record<Platform, string> = {
  jd: '#e4393c',
  taobao: '#ff5000',
  pinduoduo: '#e02e24'
};

const platformNames: Record<Platform, string> = {
  jd: '京东',
  taobao: '淘宝',
  pinduoduo: '拼多多'
};

export function PriceChart({ products }: PriceChartProps) {
  const platformStats = products.reduce((acc, product) => {
    if (!acc[product.platform]) {
      acc[product.platform] = { prices: [], count: 0 };
    }
    acc[product.platform].prices.push(product.price);
    acc[product.platform].count++;
    return acc;
  }, {} as Record<Platform, { prices: number[]; count: number }>);

  const platforms = Object.keys(platformStats) as Platform[];
  const avgPrices = platforms.map(p => {
    const prices = platformStats[p].prices;
    return prices.reduce((a, b) => a + b, 0) / prices.length;
  });

  const data = {
    labels: platforms.map(p => platformNames[p]),
    datasets: [
      {
        label: '平均价格（元）',
        data: avgPrices,
        backgroundColor: platforms.map(p => platformColors[p] + '80'),
        borderColor: platforms.map(p => platformColors[p]),
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        callbacks: {
          label: (context: any) => `平均价格：¥${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: (value: any) => '¥' + value,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-80">
      <Bar data={data} options={options} />
    </div>
  );
}
