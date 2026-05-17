#!/usr/bin/env node

import { program } from 'commander';
import { collectAllProducts } from '../api/services/collector';
import { processProducts, calculatePlatformStats, getRecommendations } from '../api/services/processor';
import { Product } from '../shared/types';

const platformNames: Record<string, string> = {
  jd: '京东',
  taobao: '淘宝',
  pinduoduo: '拼多多'
};

function formatPrice(price: number): string {
  return `¥${price.toFixed(2)}`;
}

function printProductTable(products: Product[]): void {
  console.log('\n📋 商品列表（按价格从低到高排序）：');
  console.log('─'.repeat(120));
  console.log(
    `${'序号'.padEnd(4)} ${'平台'.padEnd(8)} ${'价格'.padEnd(12)} ${'销量'.padEnd(10)} ${'评分'.padEnd(8)} ${'店铺'.padEnd(16)} ${'商品名称'}`
  );
  console.log('─'.repeat(120));
  
  products.forEach((product, index) => {
    console.log(
      `${(index + 1).toString().padEnd(4)} ` +
      `${platformNames[product.platform].padEnd(8)} ` +
      `${formatPrice(product.price).padEnd(12)} ` +
      `${product.sales.toString().padEnd(10)} ` +
      `${product.shopRating.toFixed(1).padEnd(8)} ` +
      `${product.shopName.padEnd(16)} ` +
      `${product.name}`
    );
  });
  console.log('─'.repeat(120));
}

function printStats(products: Product[]): void {
  const stats = calculatePlatformStats(products);
  console.log('\n📊 各平台统计：');
  console.log('─'.repeat(80));
  console.log(
    `${'平台'.padEnd(10)} ${'商品数'.padEnd(10)} ${'最低价'.padEnd(12)} ${'最高价'.padEnd(12)} ${'平均价'}`
  );
  console.log('─'.repeat(80));
  
  stats.forEach(stat => {
    console.log(
      `${platformNames[stat.platform].padEnd(10)} ` +
      `${stat.productCount.toString().padEnd(10)} ` +
      `${formatPrice(stat.minPrice).padEnd(12)} ` +
      `${formatPrice(stat.maxPrice).padEnd(12)} ` +
      `${formatPrice(stat.avgPrice)}`
    );
  });
  console.log('─'.repeat(80));
}

function printRecommendations(products: Product[]): void {
  const recommendations = getRecommendations(products);
  console.log('\n⭐ 性价比推荐：');
  console.log('─'.repeat(100));
  
  recommendations.forEach((product, index) => {
    console.log(
      `${index + 1}. [${platformNames[product.platform]}] ${product.name}`
    );
    console.log(
      `   价格：${formatPrice(product.price)} | 销量：${product.sales} | 评分：${product.shopRating.toFixed(1)} | 店铺：${product.shopName}`
    );
    if (product.originalPrice) {
      const discount = ((1 - product.price / product.originalPrice) * 100).toFixed(0);
      console.log(`   原价：${formatPrice(product.originalPrice)} | 节省：${discount}%`);
    }
    console.log();
  });
  console.log('─'.repeat(100));
}

program
  .name('price-compare')
  .description('电商商品价格自动化采集与对比工具')
  .version('1.0.0');

program
  .command('search <keyword>')
  .description('搜索商品并进行价格对比')
  .action(async (keyword: string) => {
    console.log(`\n🔍 正在搜索："${keyword}"`);
    console.log('⏳ 正在采集各平台数据...');
    
    try {
      const rawProducts = await collectAllProducts(keyword);
      const processedProducts = processProducts(rawProducts);
      
      console.log(`✅ 采集完成！共找到 ${processedProducts.length} 个商品`);
      
      printProductTable(processedProducts);
      printStats(processedProducts);
      printRecommendations(processedProducts);
      
    } catch (error) {
      console.error('❌ 搜索失败：', error);
      process.exit(1);
    }
  });

program.parse();
