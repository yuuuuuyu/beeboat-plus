import * as components from 'beeboat-plus/es/components';
export * from 'beeboat-plus/es/components';
export * from 'beeboat-plus/es/core';

const install = (app) => {
    Object.entries(components).forEach(([name, component]) => {
        app.component(name, component);
        // app.use(component)
    });
};
var index = { install };

export { index as default };
