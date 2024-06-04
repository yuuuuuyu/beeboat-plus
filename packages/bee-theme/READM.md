## css 变量

```css
:root {
    /** Element UI 使用 */
    --el-color-white: #ffffff;
    --el-color-black: #000000;
    --el-text-color-primary: #3e4a6b;
    --el-color-primary: #409eff;
    --el-color-primary-rgb: 64, 158, 255;
    --el-color-primary-light-1: #53a8ff;
    --el-color-primary-light-2: #66b1ff;
    --el-color-primary-light-3: #79bbff;
    --el-color-primary-light-4: #8cc5ff;
    --el-color-primary-light-5: #a0cfff;
    --el-color-primary-light-6: #b3d8ff;
    --el-color-primary-light-7: #c6e2ff;
    --el-color-primary-light-8: #d9ecff;
    --el-color-primary-light-9: #ecf5ff;
    --el-color-primary-dark-2: #337ecc;
    --el-color-success: #67c23a;
    --el-color-success-rgb: 103, 194, 58;
    --el-color-success-light-1: #76c84e;
    --el-color-success-light-2: #85ce61;
    --el-color-success-light-3: #95d475;
    --el-color-success-light-4: #a4da89;
    --el-color-success-light-5: #b3e19d;
    --el-color-success-light-6: #c2e7b0;
    --el-color-success-light-7: #d1edc4;
    --el-color-success-light-8: #e1f3d8;
    --el-color-success-light-9: #f0f9eb;
    --el-color-success-dark-2: #529b2e;
    --el-color-warning: #e6a23c;
    --el-color-warning-rgb: 230, 162, 60;
    --el-color-warning-light-1: #e9ab50;
    --el-color-warning-light-2: #ebb563;
    --el-color-warning-light-3: #eebe77;
    --el-color-warning-light-4: #f0c78a;
    --el-color-warning-light-5: #f3d19e;
    --el-color-warning-light-6: #f5dab1;
    --el-color-warning-light-7: #f8e3c5;
    --el-color-warning-light-8: #faecd8;
    --el-color-warning-light-9: #fdf6ec;
    --el-color-warning-dark-2: #b88230;
    --el-color-danger: #f56c6c;
    --el-color-danger-rgb: 245, 108, 108;
    --el-color-danger-light-1: #f67b7b;
    --el-color-danger-light-2: #f78989;
    --el-color-danger-light-3: #f89898;
    --el-color-danger-light-4: #f9a7a7;
    --el-color-danger-light-5: #fab6b6;
    --el-color-danger-light-6: #fbc4c4;
    --el-color-danger-light-7: #fcd3d3;
    --el-color-danger-light-8: #fde2e2;
    --el-color-danger-light-9: #fef0f0;
    --el-color-danger-dark-2: #c45656;
    --el-color-error: #f56c6c;
    --el-color-error-rgb: 245, 108, 108;
    --el-color-error-light-1: #f67b7b;
    --el-color-error-light-2: #f78989;
    --el-color-error-light-3: #f89898;
    --el-color-error-light-4: #f9a7a7;
    --el-color-error-light-5: #fab6b6;
    --el-color-error-light-6: #fbc4c4;
    --el-color-error-light-7: #fcd3d3;
    --el-color-error-light-8: #fde2e2;
    --el-color-error-light-9: #fef0f0;
    --el-color-error-dark-2: #c45656;
    --el-color-info: #3e4a6b;
    --el-color-info-rgb: 62, 74, 107;
    --el-color-info-light-1: #515c7a;
    --el-color-info-light-2: #656e89;
    --el-color-info-light-3: #788097;
    --el-color-info-light-4: #8b92a6;
    --el-color-info-light-5: #9fa5b5;
    --el-color-info-light-6: #b2b7c4;
    --el-color-info-light-7: #c5c9d3;
    --el-color-info-light-8: #d8dbe1;
    --el-color-info-light-9: #ecedf0;
    --el-color-info-dark-2: #323b56;

    /** 按钮使用 */
    --ever-button-hover-bg-color-primary: #258af2;
    --ever-button-active-bg-color-primary: #0c77e6;
    --ever-button-bg-color-secondary: #e8edff;
    --ever-button-hover-bg-color-secondary: #c4cef2;
    --ever-button-active-bg-color-secondary: #a3b1e6;
    --ever-button-hover-bg-color-warning: #d99023;
    --ever-button-active-bg-color-warning: #cd800c;
    --ever-button-hover-bg-color-danger: #e84f4f;
    --ever-button-active-bg-color-danger: #dc3535;
}

.ever-button {
    /** 主按钮 */
    --ever-button-bg-color-primary: var(--el-color-primary);
    --ever-button-text-color-primary: var(--el-color-white);
    --ever-button-border-color-primary: var(--el-color-primary);
    --ever-button-hover-text-color-primary: var(--el-color-white);
    --ever-button-active-text-color-primary: var(--el-color-white);

    /** 次级按钮 */
    --ever-button-text-color-secondary: var(--el-color-primary);
    --ever-button-hover-text-color-secondary: var(--el-color-primary);
    --ever-button-active-text-color-secondary: var(--el-color-white);

    /** 次级按钮线框 边框 */
    --ever-button-border-color-secondary-plain: var(--el-color-primary);

    /** 警告按钮 */
    --ever-button-bg-color-warning: var(--el-color-warning);
    --ever-button-text-color-warning: var(--el-color-white);
    --ever-button-border-color-warning: var(--el-color-warning);
    --ever-button-hover-text-color-warning: var(--el-color-white);
    --ever-button-active-text-color-warning: var(--el-color-white);

    /** 警示按钮 */
    --ever-button-bg-color-danger: var(--el-color-danger);
    --ever-button-text-color-danger: var(--el-color-white);
    --ever-button-border-color-danger: var(--el-color-danger);
    --ever-button-hover-text-color-danger: var(--el-color-white);
    --ever-button-active-text-color-danger: var(--el-color-white);
}
```
