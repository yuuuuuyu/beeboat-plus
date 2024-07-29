import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * 统一将src/components下的组件scss自动导入到index.ts中，
 * 以便在项目中直接引用组件，无需手动导入scss文件。
 * 
 * 也许还有别的配置方式?
 */

// 获取当前模块的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, '../src', 'components');
const indexFilePath = path.join(__dirname, '../src', 'index.ts');

// 读取 components 目录下的所有 SCSS 文件
fs.readdir(componentsDir, (err, files) => {
    if (err) {
        console.error('Error reading components directory:', err);
        return;
    }

    // 过滤出所有 SCSS 文件
    const scssFiles = files.filter(file => file.endsWith('.scss'));

    // 生成导入语句
    const imports = scssFiles.map(file => `import './components/${file}';`).join('\n');

    // 读取现有的 index.ts 内容
    fs.readFile(indexFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading index.ts file:', err);
            return;
        }

        // 检查是否已经包含 SCSS 导入的标记
        const importMarker = '// SCSS imports';
        if (!data.includes(importMarker)) {
            // 将 SCSS 导入添加到文件内容中，使用标记位置以便将来管理
            const updatedContent = `${imports}\n\n${importMarker}\n${data}`;

            // 写入更新后的内容到 index.ts 文件
            fs.writeFile(indexFilePath, updatedContent, (err) => {
                if (err) {
                    console.error('Error writing index.ts file:', err);
                    return;
                }
                console.log('index.ts has been updated with SCSS imports.');
            });
        } else {
            console.log('SCSS imports are already present in index.ts.');
        }
    });
});
