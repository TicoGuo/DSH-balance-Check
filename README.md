# @TicoGuo/dsh-balance-check

DSH（DeepSeek Harness）余额 + 用量插件。安装后在输入框旁显示 `¥` 余额按钮，点开弹窗可查看余额、消费金额、Tokens 用量、各模型明细，并有充值入口；在「设置 → 插件 → 插件配置」里提供「余额显示」配置卡片。

<img width="302" height="660" alt="image" src="https://github.com/user-attachments/assets/8fc722a3-0bda-45e6-9796-050e2216c66f" />

## 前置条件

安装前请先准备好以下环境。若提示 `无法将“dsh”项识别为 cmdlet`，说明 `dsh` 尚未安装或不在 PATH 中，请先完成第 2 步。

**1. Node.js**（自带 npm）

**2. `dsh` 命令行工具** —— 二选一：

全局安装（之后可直接使用 `dsh` 命令）：

```bash
npm install -g @deepseek-ai/dsh
```

或每次用 `npx` 前缀临时运行，无需全局安装：

```bash
npx @deepseek-ai/dsh --version
```

**3. pnpm** —— `dsh plugin ... add` 底层会转发给 pnpm：

```bash
npm install -g pnpm
```

完成后可运行 `dsh --version`（或 `npx @deepseek-ai/dsh --version`）确认可用。

## 安装

一条命令即可安装：

```bash
dsh plugin --profile web add github:TicoGuo/DSH-balance-Check
```

未全局安装 `dsh` 时，改用 `npx` 前缀：

```bash
npx @deepseek-ai/dsh plugin --profile web add github:TicoGuo/DSH-balance-Check
```

安装后重启 `dsh web`，浏览器打开 http://127.0.0.1:3080 即可。

## 配置

进入 **设置 → 插件 → 插件配置 → 余额显示**：

- **DeepSeek API Key**（必需，`sk-` 开头）——已配置会显示脱敏值，输入新值即可替换。
- **平台登录态 Token**（可选，用于消费金额 / Tokens 用量）——获取方法见卡片内说明。

保存后，输入框右侧即出现 `¥` 余额按钮。

## 依赖说明

- 运行时依赖 DSH 核心包（`@deepseek-ai/cordis`、`@deepseek-ai/dsh-*`、`@deepseek-ai/schemastery`、`react`），它们由使用者的 DSH 安装提供，无需单独安装。
- 本包是「双面包」：`lib/index.js` 是宿主（`/balance` 路由），`lib/client.js` 是浏览器端（按钮 + 卡片），`cordis.patch.yml` 是 bundle 补丁。

## 目录

- `cordis.patch.yml` — bundle 补丁
- `lib/` — 构建产物（`index.js` / `invariant.js` / `client.js` / 类型声明）
- `src/` — 源码（`index.ts` 宿主半边，`client/` 浏览器半边）
