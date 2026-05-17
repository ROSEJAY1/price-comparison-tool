# 电商价格对比工具

一个功能强大的电商商品价格自动化采集与对比工具，支持京东、淘宝、拼多多三大主流平台。

## 功能特性

- 🛒 **多平台搜索**：同时搜索京东、淘宝、拼多多三大电商平台
- 💰 **智能价格对比**：自动汇总各平台价格信息，可视化展示价格趋势
- 📊 **数据可视化**：使用Chart.js生成直观的价格对比图表
- ⭐ **性价比推荐**：智能算法分析价格、销量、评分，推荐最优选择
- 🧹 **数据清洗**：自动去重、排序，提供高质量的商品数据
- 🖥️ **Web界面**：美观的React前端，支持搜索和结果展示
- 💻 **命令行工具**：支持CLI方式快速搜索和对比

## 技术栈

- **前端**：React 18 + TypeScript + Vite + Tailwind CSS
- **后端**：Express.js + TypeScript
- **图表**：Chart.js + react-chartjs-2
- **状态管理**：Zustand
- **CLI**：Commander.js

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

这将同时启动：
- 前端开发服务器：http://localhost:5173
- 后端API服务器：http://localhost:3001

### 3. 使用Web界面

1. 打开浏览器访问 http://localhost:5173
2. 在搜索框输入商品关键词（如：iPhone 15、Nike运动鞋）
3. 点击搜索按钮，查看各平台的商品对比结果
4. 首页会显示"iPhone 15"的示例数据，您可以直接查看完整结果

### 4. 使用命令行工具

```bash
npm run cli search "iPhone 15"
```

## 项目结构

```
.
├── api/                    # 后端代码
│   ├── routes/            # API路由
│   ├── services/          # 业务逻辑（数据采集、处理）
│   ├── app.ts             # Express应用配置
│   └── server.ts          # 服务器入口
├── src/                   # 前端代码
│   ├── components/        # React组件
│   ├── pages/            # 页面组件
│   ├── store/            # 状态管理
│   └── App.tsx           # 应用入口
├── cli/                   # 命令行工具
├── shared/                # 共享类型定义
└── package.json
```

## 核心功能说明

### 数据采集
- 支持京东、淘宝、拼多多三大平台
- 目前使用模拟数据（实际应用中可接入真实爬虫）
- 采集信息包括：商品名称、价格、销量、店铺评分、URL等

### 数据处理
- 数据清洗：过滤无效数据
- 去重：去除重复商品
- 排序：按价格从低到高排序

### 智能推荐
- 综合考虑价格、销量、评分
- 使用加权评分算法
- 自动标注TOP 3推荐商品

## 可用命令

```bash
# 启动开发环境（前端+后端）
npm run dev

# 仅启动前端
npm run client:dev

# 仅启动后端
npm run server:dev

# 运行命令行工具
npm run cli search "关键词"

# 类型检查
npm run check

# 代码检查
npm run lint

# 构建生产版本
npm run build
```

## 部署上线

详细的部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

### 快速部署（推荐 Vercel）

1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 导入您的仓库
4. 点击部署！

详细步骤见部署指南。

## 注意事项

- 本项目使用模拟数据，实际应用需要接入真实的电商数据爬虫
- 电商平台有反爬机制，实际采集需要考虑合法性和技术手段
- 建议仅供学习和参考使用

## 开发团队

使用 Trae AI 智能开发助手构建
