## 1. Architecture Design
```mermaid
graph TD
    A[用户界面] -->|前端| B[React + Vite]
    B -->|API请求| C[Express.js后端]
    C -->|数据采集| D[电商平台数据采集模块]
    D -->|京东| D1[京东数据]
    D -->|淘宝| D2[淘宝数据]
    D -->|拼多多| D3[拼多多数据]
    C -->|数据处理| E[数据清洗/去重/排序]
    E -->|存储/返回| F[商品数据]
    B -->|图表展示| G[Chart.js]
    H[命令行工具] -->|直接调用| C
```

## 2. Technology Description
- 前端: React@18 + TypeScript + tailwindcss@3 + vite
- 初始化工具: vite-init
- 后端: Express@4 + TypeScript
- 图表库: Chart.js + react-chartjs-2
- 其他: 不需要数据库，使用内存存储临时数据
- 命令行工具: Node.js + Commander.js

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | 首页，搜索和数据示例 |
| /results | 商品对比结果页面 |
| /api/search | 后端API，执行商品搜索和采集 |

## 4. API Definitions
### 4.1 Search API
```typescript
// Request
interface SearchRequest {
  keyword: string;
}

// Response
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  sales: number;
  shopRating: number;
  platform: 'jd' | 'taobao' | 'pinduoduo';
  url: string;
  image?: string;
  shopName: string;
}

interface SearchResponse {
  success: boolean;
  data: Product[];
  timestamp: number;
}
```

## 5. Server Architecture Diagram
```mermaid
graph LR
    A[API Controller] --> B[Search Service]
    B --> C[Data Collection Service]
    C --> D1[JD Collector]
    C --> D2[Taobao Collector]
    C --> D3[Pinduoduo Collector]
    B --> E[Data Processing Service]
    E --> E1[Data Cleaning]
    E --> E2[Deduplication]
    E --> E3[Sorting]
```

## 6. Data Model
### 6.1 Data Model Definition
```mermaid
erDiagram
    PRODUCT {
        string id PK
        string name
        number price
        number originalPrice
        number sales
        number shopRating
        string platform
        string url
        string image
        string shopName
    }
```

### 6.2 数据结构说明
无需物理数据库，使用内存存储，数据结构如上Product接口定义。
