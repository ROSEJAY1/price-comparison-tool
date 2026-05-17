# 部署指南

本文档介绍如何将电商价格对比工具部署上线。

## 🚀 方案一：Vercel 部署（推荐）

Vercel 提供免费额度，部署 React 应用非常简单。

### 步骤 1：准备代码仓库

1. 将代码推送到 GitHub / GitLab / Bitbucket
2. 确保仓库是公开的或私有都可以

### 步骤 2：连接 Vercel

1. 访问 [vercel.com](https://vercel.com) 并注册账号
2. 点击 "New Project"
3. 选择刚才创建的代码仓库
4. 点击 "Import"

### 步骤 3：配置部署

在项目设置页面：
- **Framework Preset**: 选择 `Vite`
- **Root Directory**: 保持默认
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 步骤 4：部署

点击 "Deploy" 按钮，等待几分钟即可！

部署成功后，您会获得一个类似 `https://your-app.vercel.app` 的网址。

---

## 🚀 方案二：Netlify 部署

### 步骤 1：准备仓库

和 Vercel 一样，先将代码推送到 Git 仓库

### 步骤 2：连接 Netlify

1. 访问 [netlify.com](https://www.netlify.com)
2. 点击 "New site from Git"
3. 选择您的仓库
4. 配置部署设置：
   - Build command: `npm run build`
   - Publish directory: `dist`

### 步骤 3：部署后端

Netlify Functions 可以部署后端 API，创建 `netlify/functions/search.ts`

---

## 🚀 方案三：Railway（全栈部署）

Railway 适合同时部署前后端。

1. 访问 [railway.app](https://railway.app)
2. 点击 "New Project" → "Deploy from repo"
3. 选择您的仓库
4. Railway 会自动检测并部署

---

## 📋 构建和测试

在部署前，先确保本地构建成功：

```bash
# 安装依赖
npm install

# 运行类型检查
npm run check

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

---

## 🔧 环境变量

如果需要配置环境变量，在部署平台的设置中添加：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| NODE_ENV | 运行环境 | production |

---

## 📦 package.json 脚本说明

```json
{
  "dev": "启动开发服务器",
  "build": "构建生产版本",
  "preview": "预览构建结果",
  "check": "TypeScript 类型检查",
  "lint": "代码检查"
}
```

---

## 🎉 部署后测试

部署完成后：
1. 访问您的网站地址
2. 测试搜索功能
3. 检查API是否正常工作

---

## 💡 提示

- 免费版有使用限制，适合学习和演示
- 如需更多功能，可以考虑付费方案
- 首次部署可能需要几分钟，之后会自动部署

---

## 🔄 持续部署

连接 Git 仓库后，每次推送代码都会自动部署！
