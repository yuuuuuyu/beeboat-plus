# @beeboat/components

- 1. v1: components构建总耗时14s，其中dts比较耗时11s多，占75%
- 2. v2: components构建总耗时10s，其中dts比较耗时6s多，占66%
- 3. v3: components构建总耗时8s，其中dts比较耗时4s多，占50%

## 优化方向

ai提供，后续验证

- 1. 使用typescript的emitDeclarationOnly选项
- 2. 使用typescript的incremental选项
- 3. 使用tsc --build
- 4. 使用tsc --watch
- 5. 使用babel的tsc
- 6. 使用tsc --noEmit