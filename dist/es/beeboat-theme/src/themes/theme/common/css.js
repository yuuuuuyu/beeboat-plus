export default `
:root {
    --bt-dockpanel-separator-color: #dce4f2;
    --bt-drawer-dialog-top: 100px;
    --bt-drawer-dialog-right: 8px;
    --bt-drawer-dialog-left: 208px;
    --bt-drawer-dialog-bottom: 8px;
    --bt-width-full: 100%;
    --bt-form-width: 368px;
    --bt-form-multi-width: 240px;
    --bt-form-margin-right: 32px;
    --bt-gap-s8: 8px;
    --bt-gap-s16: 16px;
    --bt-gap-s24: 24px;
    --bt-gap-s32: 32px;

    --ever-button-text-color-secondary: var(--el-color-primary);
    --ever-button-hover-text-color-secondary: var(--el-color-primary);
    --ever-button-active-text-color-secondary: var(--el-color-white);
}

@function spacingWidth($width, $num) {
    @return ($width + $bt-form-margin-right) * $num - $bt-form-margin-right;
}

.bt-card.el-card {
    display: flex;
    flex-direction: column
}
.bt-card.el-card .el-card__header {
    height: 48px;
    padding: 14px var(--bt-gap-s24);
    font-size: var(--bt-gap-s16);
    font-weight: 700
}
.bt-card.el-card .el-card__body {
    position: relative;
    flex: 1;
    padding: var(--bt-gap-s16) var(--bt-gap-s32);
    overflow: hidden;
}

.bt-card .bt-card-header {
    display: flex;
    flex-direction: row;
}

.bt-card .bt-card-header .bt-card-header--title {
    flex:1;
}

.bt-card .bt-card-header .bt-card-header--toolbar {
    margin-top:-2px;
}

.el-dialog {
    border-radius: 6px
}

.el-dialog .el-dialog__header {
    box-sizing: border-box;
    height: 48px;
    padding: 12px var(--bt-gap-s24);
    margin-right: 0;
    font-size: var(--bt-gap-s16);
    font-weight: 700;
    border-bottom: 1px solid #dce4f2
}

.el-dialog .el-dialog__header .el-dialog__headerbtn {
    top: 0;
    width: 48px;
    height: 48px
}

.el-dialog .el-dialog__body {
    box-sizing: border-box;
    padding: var(--bt-gap-s24) 32px;
    overflow: hidden
}

.el-dialog .el-dialog__footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: var(--bt-gap-s24) 32px
}

.el-overlay:has(.is-fullscreen.bt-drawer-dialog) {
    top: var(--bt-drawer-dialog-top);
    right: var(--bt-drawer-dialog-right);
    left: var(--bt-drawer-dialog-left);
    height: calc(100% - var(--bt-drawer-dialog-top) - var(--bt-drawer-dialog-bottom));
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #dce4f2;
    border-radius: 0
}

.el-overlay:has(.is-fullscreen.bt-drawer-dialog) .el-overlay-dialog {
    position: relative;
    width: 100%;
    height: 100%
}

.el-overlay:has(.is-fullscreen.bt-drawer-dialog) .el-dialog__body {
    position: relative;
    height: calc(100% - 105px);
    overflow: auto
}

.el-overlay:has(.is-fullscreen.bt-drawer-dialog) .el-dialog__footer {
    height: 56px;
    border-top: 1px solid #dce4f2
}

/** tabs定位组件 */
.bt-tabs-anchor .el-tabs__header {
    padding: 0;
    margin:0 0 8px 0;
}

.bt-tabs-anchor .el-tabs__item {
    font-size: var(--bt-gap-s16);
    font-weight: bold;
}

/** 分组组件 */
.bt-group > .bt-group-title {
  height: var(--bt-gap-s16);
  margin-bottom: var(--bt-gap-s8);
  font-size: var(--bt-gap-s16);
  font-weight: bold;
}

.bt-group > .bt-group-title > .bt-group--expand-icon {
    width: 20px;
    margin-right: var(--bt-gap-s8);
}

.bt-group > .bt-group-title > .bt-group--divider {
    width: 4px;
    height: var(--bt-gap-s16);
    margin-right: var(--bt-gap-s8);
    background-color: var(--el-color-primary);
}

.bt-group.collapsable > .bt-group-title {
  height: 40px;
  margin-bottom: 0px;
  font-size: var(--bt-gap-s16);
  font-weight: bold;
  background-color: #f6f9ff;
}

.bt-group.collapsable > .bt-group--content > .bt-group--content-wrapper {
  padding: var(--bt-gap-s16) var(--bt-gap-s24) 32px var(--bt-gap-s24);
}

/** 输入框、选择框、日期组件 */
.bt-input, .bt-input > .el-input, .bt-select, .bt-select > .el-select, .bt-date-picker, .bt-date-picker > .el-input {
    width: var(--bt-width-full);
}

button.ever-button {
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

    font-weight: 400;
}

/** 主要按钮 */
button.ever-button.el-button.ever-button--primary {
    color: var(--ever-button-text-color-primary);
    background-color: var(--ever-button-bg-color-primary);
    border-color: var(--ever-button-border-color-primary);
}

button.ever-button.el-button.ever-button--primary:hover, button.ever-button.el-button.ever-button--primary:focus {
    color: var(--ever-button-hover-text-color-primary);
    background-color: var(--ever-button-hover-bg-color-primary);
    border-color: var(--ever-button-hover-border-color-primary);
}

button.ever-button.el-button.ever-button--primary:active {
    color: var(--ever-button-active-text-color-primary);
    background-color: var(--ever-button-active-bg-color-primary);
    border-color: var(--ever-button-active-border-color-primary);
}

/** 次要按钮 */
button.ever-button.el-button.is-disabled.ever-button--secondary {
    color: var(--ever-button-text-color-primary);
}
button.ever-button.el-button.is-disabled.ever-button--secondary:hover, button.ever-button.el-button.is-disabled.ever-button--secondary:focus {
    color: var(--ever-button-text-color-primary);
}

button.ever-button.el-button.ever-button--secondary {
    color: var(--ever-button-text-color-secondary);
    background-color: var(--ever-button-bg-color-secondary);
    border-color: var(--ever-button-bg-color-secondary);
}

button.ever-button.el-button.ever-button--secondary:hover, button.ever-button.el-button.ever-button--secondary:focus{
    color: var(--ever-button-hover-text-color-secondary);
    background-color: var(--ever-button-hover-bg-color-secondary);
    border-color: var(--ever-button-hover-bg-color-secondary);
}

button.ever-button.el-button.ever-button--secondary:active {
    color: var(--ever-button-active-text-color-secondary);
    background-color: var(--ever-button-active-bg-color-secondary);
    border-color: var(--ever-button-active-bg-color-secondary);
}

button.ever-button.el-button.ever-button--secondary.ever-button--secondary-plain {
    border-color: var(--ever-button-bg-color-secondary-plain);
}

/** 提示按钮 */
button.ever-button.el-button.ever-button--warning {
    color: var(--ever-button-text-color-warning);
    background-color: var(--ever-button-bg-color-warning);
    border-color: var(--ever-button-bg-color-warning);
}

/** 提示按钮 */
button.ever-button.el-button.ever-button--warning:hover, button.ever-button.el-button.ever-button--warning:focus {
    color: var(--ever-button-hover-text-color-warning);
    background-color: var(--ever-button-hover-bg-color-warning);
    border-color: var(--ever-button-hover-bg-color-warning);
}

button.ever-button.el-button.ever-button--warning:active {
    color: var(--ever-button-active-text-color-warning);
    background-color: var(--ever-button-active-bg-color-warning);
    border-color: var(--ever-button-active-bg-color-warning);
}

/** 警示按钮 */
button.ever-button.el-button.ever-button--danger {
    color: var(--ever-button-text-color-danger);
    background-color: var(--ever-button-bg-color-danger);
    border-color: var(--ever-button-bg-color-danger);
}

button.ever-button.el-button.ever-button--danger:hover, button.ever-button.el-button.ever-button--danger:focus {
    color: var(--ever-button-hover-text-color-danger);
    background-color: var(--ever-button-hover-bg-color-danger);
    border-color: var(--ever-button-hover-bg-color-danger);
}

button.ever-button.el-button.ever-button--danger:active {
    color: var(--ever-button-active-text-color-danger);
    background-color: var(--ever-button-active-bg-color-danger);
    border-color: var(--ever-button-active-bg-color-danger);
}

/** 按钮禁用 */
button.ever-button.el-button.is-disabled {
    background-color: var(--ever-color-button-disable);
    border-color: var(--ever-color-button-disable);
}

button.ever-button.el-button.is-disabled:hover, button.ever-button.el-button.is-disabled:active {
    background-color: var(--ever-color-button-disable);
    border-color: var(--ever-color-button-disable);
}

/** 按钮组件 */
.ever-button.ever-button-text {
    color: var(--ever-color-primary) !important
}

/** 状态组件 */
.bt-dict-status .mark {
    width: var(--bt-gap-s8);
    height: var(--bt-gap-s8);
    margin-right: var(--bt-gap-s8);
    border-radius: 50%;
}

/** 停靠面板 */
.bt-dockpanel .bt-dockpanel-separator {
    width: 1px;
    background-color: var(--bt-dockpanel-separator-color);
}

.bt-dockpanel .bt-dockpanel-separator .bt-dockpanel-separatorline {
    width: 9px;
    height: var(--bt-width-full);
}

.bt-dockpanel .bt-dockpanel-dock {
    width: 28px;
    height: 28px;
    line-height: 28px;
    color: var(--el-color-primary);
    cursor: pointer;
    border-radius: 50%;
}

.bt-dockpanel.bt-dockpanel--horizontal .bt-dockpanel-separator {
    width: var(--bt-width-full);
    height: 1px;
}

.bt-dockpanel.bt-dockpanel--horizontal .bt-dockpanel-separator .bt-dockpanel-separatorline {
    width: var(--bt-width-full);
    height: 9px;
}

/** 表单组件 */
.bt-form .bt-form-item {
    width: var(--bt-form-width);
    margin-right: var(--bt-form-margin-right);
}

.bt-form .bt-form-item--span2 {
    width: spacingWidth(var(--bt-form-width), 2);
}

.bt-form .bt-form-item--span3 {
    width: spacingWidth(var(--bt-form-width), 3);
}

.bt-form .bt-form-item--span4 {
    width: spacingWidth(var(--bt-form-width), 4);
}

.bt-form .bt-form-item--span5 {
    width: spacingWidth(var(--bt-form-width), 5);
}

.bt-form .bt-form-item--span6 {
    width: spacingWidth(var(--bt-form-width), 6);
}
.bt-form .bt-form-item--row1 {
    height: 30px;
}
.bt-form .bt-form-item--row1 textarea {
    height: 30px;
}
.bt-multi-form .bt-form-item {
    width: var(--bt-form-multi-width);
    margin-right: var(--bt-form-margin-right);
}

.bt-multi-form .bt-form-item--span2 {
    width: spacingWidth(var(--bt-form-multi-width), 2);
}

.bt-multi-form .bt-form-item--span3 {
    width: spacingWidth(var(--bt-form-multi-width), 3);
}

.bt-multi-form .bt-form-item--span4 {
    width: spacingWidth(var(--bt-form-multi-width), 4);
}

.bt-multi-form .bt-form-item--span5 {
    width: spacingWidth(var(--bt-form-multi-width), 5);
}

.bt-multi-form .bt-form-item--span6 {
    width: spacingWidth(var(--bt-form-multi-width), 6);
}

.bt-form  .el-form-item .el-select {
    width: var(--bt-width-full);
}

.bt-multi-form  .el-form-item .el-select {
    width: var(--bt-width-full);
}

/** splitter组件 */
.bt-splitter-item.horizontal {
    min-height: var(--bt-gap-s24);
}

.bt-splitter-item.horizontal > *:first-child {
    height: 100%;
    background-color: white;
}

.bt-splitter-item.vertical {
    min-height: var(--bt-gap-s24);
}

.bt-splitter-item.vertical > *:first-child {
    width: 100%;
    background-color: white;
}

.bt-splitter-item.vertical:last-child{
    padding-bottom: 0 !important;
}

.bt-tree {
    width: var(--bt-width-full);
    height: var(--bt-width-full);
}

.bt-tree .bt-tree--searchbar {
    padding-bottom: var(--bt-gap-s8);
}

.bt-tree .bt-tree--toolbar:not(:empty) {
    padding-bottom: var(--bt-gap-s8);
}

.bt-tree .el-tree-node__content {
    height: 32px;
    padding-right: var(--bt-gap-s8);
}

.bt-tree .el-tree-node__content .el-tree-node__expand-icon {
    padding: var(--bt-gap-s8);
}


`;
