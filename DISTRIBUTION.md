# 🚀 分发指南 - timestool

这个文档展示如何分发 timestool 到用户手中。

---

## 方式 1️⃣：本地全局安装（最简单）

**适用场景**：在自己的机器上使用，或给本地团队安装

### 步骤

```bash
# 1. 进入项目目录
cd /Users/huami/Desktop/github/node_learning/node_tool

# 2. 创建全局软链接
npm link

# 3. 验证安装
timestool --help
```

### 使用方式

```bash
# 在任何终端窗口、任何目录下都可以用
timestool ts2date 1713787200
timestool date2ts "2024-04-22"
timestool now
```

### 卸载

```bash
npm unlink -g timestool
```

---

## 方式 2️⃣：通过 GitHub 安装

**适用场景**：共享给团队或朋友，源代码开放

### Step 1: 上传到 GitHub

```bash
# 初始化 git 仓库（如果未初始化）
git init
git add .
git commit -m "Initial commit: timestool v1.0.0"

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/timestool.git
git branch -M main
git push -u origin main
```

### Step 2: 用户安装

用户可以通过以下两种方式安装：

**方式 A：全局安装**
```bash
npm install -g https://github.com/YOUR_USERNAME/timestool.git
# 或使用 git 协议
npm install -g git+ssh://git@github.com/YOUR_USERNAME/timestool.git
```

**方式 B：本地使用**
```bash
git clone https://github.com/YOUR_USERNAME/timestool.git
cd timestool
npm install
node bin/cli.js ts2date 1713787200
```

---

## 方式 3️⃣：发布到 npm（正式分发）

**适用场景**：公开发布，任何人都可以使用

### 前置条件

1. **npm 账户** - 在 [npmjs.com](https://www.npmjs.com) 注册
2. **唯一的包名** - 修改 `package.json` 中的 `name` 字段

### Step 1: 准备包名

编辑 `package.json`，修改包名为唯一的标识：

```json
{
  "name": "@your-username/timestool"
}
```

或不带 scope（需要完全唯一）：
```json
{
  "name": "timestool-convert"
}
```

### Step 2: 检查 package.json

确保以下字段已正确填写：
```json
{
  "name": "@your-username/timestool",
  "version": "1.0.0",
  "description": "Unix timestamp ↔ date conversion CLI tool",
  "author": "Your Name <email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/timestool.git"
  },
  "homepage": "https://github.com/your-username/timestool#readme",
  "bin": {
    "timestool": "bin/cli.js"
  }
}
```

### Step 3: 本地登录 npm

```bash
npm login
# 输入用户名、密码、邮箱
```

### Step 4: 发布

```bash
# 检查要发布的文件
npm pack

# 发布到 npm
npm publish --access=public

# 对于 scoped 包（@your-username/...），需要：
npm publish --access=public
```

### Step 5: 验证发布

```bash
npm info @your-username/timestool
```

或访问 `https://www.npmjs.com/package/@your-username/timestool`

### Step 6: 用户安装

发布后，任何人都可以安装使用：

```bash
npm install -g @your-username/timestool
# 或
npm install -g timestool-convert  # 如果用的是非 scoped 包名
```

---

## 方式 4️⃣：通过 Docker 分发

**适用场景**：跨平台使用，不需要安装 Node.js

### 创建 Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY bin ./bin
COPY src ./src

ENTRYPOINT ["node", "bin/cli.js"]
```

### 构建和推送

```bash
# 本地构建测试
docker build -t timestool:1.0.0 .

# 测试
docker run timestool:1.0.0 ts2date 1713787200

# 推送到 Docker Hub
docker tag timestool:1.0.0 your-username/timestool:1.0.0
docker push your-username/timestool:1.0.0
```

### 用户使用

```bash
docker run --rm your-username/timestool:1.0.0 ts2date 1713787200
# 或创建别名
alias timestool="docker run --rm your-username/timestool:1.0.0"
timestool ts2date 1713787200
```

---

## 方式 5️⃣：创建可执行文件（可选）

**适用场景**：给不了解 Node.js 的用户

### 使用 pkg 工具

```bash
# 安装 pkg
npm install -g pkg

# 构建可执行文件
pkg . --targets node18-macos-x64,node18-linux-x64,node18-win-x64 --output timestool

# 输出：
# - timestool-macos   (macOS)
# - timestool-linux   (Linux)
# - timestool-win.exe (Windows)
```

### 分发可执行文件

用户无需安装任何东西，直接下载文件运行：

```bash
# macOS
./timestool-macos ts2date 1713787200

# Linux
./timestool-linux ts2date 1713787200

# Windows
./timestool-win.exe ts2date 1713787200
```

---

## 📊 分发方式对比

| 方式 | 难度 | 用户数 | 维护成本 | 适用场景 |
|------|------|--------|---------|---------|
| npm link | ⭐ 很简单 | 1-2 | 无 | 本地使用 |
| GitHub | ⭐⭐ 简单 | 1-10 | 低 | 开源分享 |
| npm 官方 | ⭐⭐ 简单 | 100+ | 中 | 正式发布 |
| Docker | ⭐⭐⭐ 中等 | 10-100 | 中 | 跨平台 |
| 可执行文件 | ⭐⭐⭐ 中等 | 1-10 | 中 | 非技术用户 |

---

## 🔄 更新版本

### 发布新版本到 npm

```bash
# 1. 修改代码
# 2. 更新 version 字段
npm version patch      # 1.0.0 → 1.0.1
npm version minor      # 1.0.0 → 1.1.0
npm version major      # 1.0.0 → 2.0.0

# 3. 发布
npm publish

# 4. 用户更新
npm install -g @your-username/timestool@latest
```

---

## 📝 推荐流程

### 对于个人/小团队

```
1. npm link 本地测试
   ↓
2. GitHub 上传，共享 git 链接
   ↓
3. （可选）发布到 npm
```

### 对于开源项目

```
1. GitHub 上传，写好 README
   ↓
2. 发布到 npm
   ↓
3. （可选）Docker 镜像
   ↓
4. 定期维护和更新版本
```

---

## ✅ 快速检查清单

发布前检查：

- [ ] `package.json` 的 `name` 字段唯一且正确
- [ ] `bin` 字段指向正确的 CLI 入口文件
- [ ] 所有文件都在 Git 仓库中（除了 node_modules）
- [ ] `.gitignore` 已配置
- [ ] README.md 内容完整
- [ ] License 文件存在（如 MIT）
- [ ] 本地测试通过：`node bin/cli.js --help`
- [ ] 依赖项已锁定：`package-lock.json` 已提交

---

## 🎯 现在就开始

**推荐第一步：本地 npm link**

```bash
npm link
timestool ts2date 1713787200
```

然后根据需要选择其他分发方式！

需要帮助吗？联系我！
