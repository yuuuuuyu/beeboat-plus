# beeboat-plus

#### 介绍

蜂舟低码平台beeboat-plus库，基于pnpm monorepo管理方式构建，pnpm build生成npm包

## 用法

初始拉取ui库，按照以下步骤依次执行

### node版本

推荐nodejs 16版本

### nodejs内存扩展

npm install -g increase-memory-limit

increase-memory-limit

setx NODE_OPTIONS --max_old_space_size=8192

### pnpm版本

> 使用pnpm 6的最后版本或者pnpm7.0的版本，否则 pnpm build构建包出问题

npm install -g pnpm@6

### 安装依赖

    pnpm install

### build前 修改beeboat-plus版本号
>
> 地址：packages\beeboat-plus\package.json
>
> "version": "2.0.135", 手动升级
>
### 正式打包

    pnpm build

### 正式发布到私有npm源上

    pnpm publish:version
    或
    pnpm publish:npm

### 本地启动exampleUI库组件示例

    pnpm dev

### gitlab提交规范

    参考 commitlint.config.js 中规则提交
