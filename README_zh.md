# timestool - Unix 时间戳 ↔ 日期转换工具

一个简洁而强大的 CLI 工具，用于在 Unix 时间戳和人类可读日期之间进行转换。

## 功能特点

- ⚡ **快速转换** - 即时转换时间戳 ↔ 日期
- 🛠️ **灵活格式** - 支持多种日期格式 (YYYY-MM-DD, DD/MM/YYYY 等)
- 🌍 **时区支持** - 支持时区感知的转换
- 📊 **双精度支持** - 支持秒和毫秒级时间戳
- ✨ **自动检测** - 自动检测时间戳格式（秒/毫秒）
- 🎯 **简单 API** - 直观的命令行界面

## 安装

```bash
npm install
```

## 全局配置（可选）

启用 `timestool` 命令，无需 `node bin/cli.js` 前缀即可全局使用。

### 方式一：npm link（推荐用于开发）

```bash
npm link
```

运行后，即可全局使用：
```bash
timestool now
timestool ts2date 1713787200
timestool --help
```

卸载全局链接：
```bash
npm unlink
```

### 方式二：全局安装

```bash
npm install -g
```

### 验证安装

```bash
timestool --help
```

如果显示帮助信息，说明配置成功。

---

## 理解 CLI 命令名称

全局命令名（`timestool`）定义在 `package.json` 的 `bin` 字段中：

```json
"bin": {
  "timestool": "bin/cli.js"
}
```

- **键** (`timestool`) — 你在终端中输入的命令名
- **值** (`bin/cli.js`) — 要执行的实际脚本文件

### 如何修改命令名

修改 `package.json` 中的 `bin` 字段：

```json
"bin": {
  "mytool": "bin/cli.js"    // 改为你想要的命令名
}
```

修改后，重新运行配置：
```bash
npm link   # 或 npm install -g
```

### 常用命令名示例

| bin 配置 | 命令 |
|---------|------|
| `"timestool": "bin/cli.js"` | `timestool` |
| `"ts": "bin/cli.js"` | `ts` |
| `"time": "bin/cli.js"` | `time` |
| `"unix": "bin/cli.js"` | `unix` |

## 使用方法

### 1. 时间戳转日期

```bash
# 基本用法（默认格式：YYYY-MM-DD HH:mm:ss，默认时区：Asia/Shanghai）
node bin/cli.js ts2date 1713787200

# 输出：✅ 2024-04-22 20:00:00

# 自定义格式
node bin/cli.js ts2date 1713787200 --format "YYYY/MM/DD"

# 输出：✅ 2024/04/22

# 不同时区
node bin/cli.js ts2date 1713787200 --timezone UTC

# 输出：✅ 2024-04-22 12:00:00

# 毫秒级时间戳
node bin/cli.js ts2date 1713787200000 --format "YYYY-MM-DD HH:mm:ss"

# 输出：✅ 2024-04-22 20:00:00
```

### 2. 日期转时间戳

```bash
# 基本用法（默认返回秒级时间戳）
node bin/cli.js date2ts "2024-04-22"

# 输出：✅ 1713715200

# 指定时区
node bin/cli.js date2ts "2024-04-22 20:00:00" --timezone "Asia/Shanghai"

# 输出：✅ 1713787200

# 返回毫秒级时间戳
node bin/cli.js date2ts "2024-04-22" --unit milliseconds

# 输出：✅ 1713715200000
```

### 3. 获取当前时间戳

```bash
# 获取当前 Unix 时间戳（秒）
node bin/cli.js now

# 输出：✅ 1776839019

# 获取毫秒级时间戳
node bin/cli.js now --unit milliseconds

# 输出：✅ 1776839019123
```

### 4. 查看日期格式示例

```bash
node bin/cli.js formats

# 输出：
# 常用日期格式：
#   YYYY-MM-DD              2026-04-22
#   YYYY-MM-DD HH:mm:ss     2026-04-22 15:30:45
#   DD/MM/YYYY              22/04/2026
#   MM/DD/YYYY              04/22/2026
#   YYYY/MM/DD              2026/04/22
#   YYYY-MM-DDTHH:mm:ssZ    2026-04-22T15:30:45Z (ISO 8601)
```

### 5. 帮助

```bash
node bin/cli.js --help
node bin/cli.js ts2date --help
node bin/cli.js date2ts --help
```

## 命令参考

### `ts2date <timestamp>`

将 Unix 时间戳转换为可读日期。

**选项：**
- `-f, --format <format>` — 日期输出格式（默认：`YYYY-MM-DD HH:mm:ss`）
- `-z, --timezone <timezone>` — 转换时区（默认：`Asia/Shanghai`）

**示例：**
```bash
node bin/cli.js ts2date 1713787200
node bin/cli.js ts2date 1713787200 --format "YYYY-MM-DD"
node bin/cli.js ts2date 1713787200 --timezone UTC
```

### `date2ts <date>`

将可读日期转换为 Unix 时间戳。

**选项：**
- `-z, --timezone <timezone>` — 解析日期的时区（默认：`Asia/Shanghai`）
- `-u, --unit <unit>` — 返回单位：`seconds` 或 `milliseconds`（默认：`seconds`）

**示例：**
```bash
node bin/cli.js date2ts "2024-04-22"
node bin/cli.js date2ts "2024-04-22 20:00:00" --timezone "Asia/Shanghai"
node bin/cli.js date2ts "2024-04-22" --unit milliseconds
```

### `now`

获取当前 Unix 时间戳。

**选项：**
- `-u, --unit <unit>` — 返回单位：`seconds` 或 `milliseconds`（默认：`seconds`）

**示例：**
```bash
node bin/cli.js now
node bin/cli.js now --unit milliseconds
```

### `formats`

显示常用日期格式示例。

### `web`

启动网页版可视化界面进行时间戳转换。

**选项：**
- `-p, --port <端口>` — Web 服务器端口号（默认：`3000`）
- `-n, --no-open` — 不自动打开浏览器

**示例：**
```bash
nodetools web                    # 使用默认端口启动网页版（3000）
nodetools web --port 8080        # 使用自定义端口
nodetools web --no-open          # 仅启动服务器，不打开浏览器
```

**功能特点：**
- 可视化时间戳 ↔ 日期转换
- 实时显示当前时间戳
- 时区选择
- 时间差计算器
- 一键复制结果

**使用方法：**
```bash
nodetools web
# 输出：✅ Web interface is running at: http://localhost:3000
# 浏览器将自动打开
```

## 支持的日期格式

使用 `--format` 指定自定义格式时，请使用 dayjs 格式令牌：

| 令牌 | 说明 | 示例 |
|------|------|------|
| YYYY | 4位数年份 | 2026 |
| MM | 2位数月份 | 04 |
| DD | 2位数日期 | 22 |
| HH | 24小时制 | 15 |
| mm | 分钟 | 30 |
| ss | 秒数 | 45 |
| YYYY-MM-DD | ISO 日期 | 2026-04-22 |
| YYYY-MM-DD HH:mm:ss | ISO 日期时间 | 2026-04-22 15:30:45 |

更多格式选项请参阅 [dayjs 文档](https://day.js.org/docs/zh-CN/display/format)。

## 支持的时区

常用时区包括：
- `UTC` — UTC/GMT
- `Asia/Shanghai` — 中国标准时间（默认）
- `Asia/Tokyo` — 日本标准时间
- `America/New_York` — 东部时间
- `Europe/London` — 英国时间
- `Australia/Sydney` — 澳大利亚东部时间

完整列表请参阅 [IANA 时区数据库](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)。

## 项目结构

```
node_tool/
├── bin/
│   └── cli.js              # CLI 入口点
├── src/
│   ├── converters.js       # 核心转换函数
│   ├── formatters.js       # 输出格式化函数
│   └── utils.js            # 工具函数 & 验证
├── web/
│   └── index.html          # 网页版界面（可视化工具）
├── package.json            # 项目元数据和依赖
├── README.md               # 英文文档
└── README_zh.md            # 中文文档
```

## 依赖

- **[commander](https://www.npmjs.com/package/commander)** — CLI 框架，用于参数解析
- **[dayjs](https://www.npmjs.com/package/dayjs)** — 轻量级日期库，支持时区

## 实用技巧

### 常用场景

**转换当前时间为北京时间：**
```bash
node bin/cli.js ts2date $(node bin/cli.js now | grep -oE '[0-9]+') --timezone Asia/Shanghai
```

**批量转换多个时间戳：**
```bash
for ts in 1713787200 1713787300 1713787400; do
  node bin/cli.js ts2date $ts
done
```

**使用自定义格式批量转换：**
```bash
node bin/cli.js ts2date 1713787200 --format "DD/MM/YYYY HH:mm"
```

## 常见问题

**Q: 无效的时间戳错误**
- 确保时间戳是有效的 Unix 时间戳（秒：10位，毫秒：13位）
- 有效时间戳示例：`1713787200`（秒）或 `1713787200000`（毫秒）

**Q: 无效的日期格式错误**
- 检查日期字符串是否符合有效格式（例如 `2024-04-22`、`04/22/2024`）
- 包含空格的日期需要加引号：`"2024-04-22 20:00:00"`

**Q: 时区差异**
- 默认时区是 `Asia/Shanghai`，使用 `--timezone UTC` 获取 UTC 时间
- 时区名称请参考 [IANA 数据库](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

## 未来计划

- [ ] REPL 交互模式
- [ ] 支持文件输入批量转换
- [ ] 配置文件支持（`.timestool.json`）
- [ ] 时间差计算
- [ ] 相对时间输出（例如 "2 小时前"）
- [ ] NPM 包发布
- [ ] 更多语言支持

## 开源协议

ISC

## 贡献

欢迎提交 issue 或 pull request 来改进这个项目！

---

**享受快速便捷的时间戳转换！** ⚡
