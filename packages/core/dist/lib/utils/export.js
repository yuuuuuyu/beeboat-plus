"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportFile = void 0;
function exportFile(response, name = '') {
    return new Promise(resolve => {
        let fileName = '';
        // 获取文件名
        if (name) {
            fileName = name;
        }
        else {
            let name = response.headers['content-disposition'];
            if (name === null || name === void 0 ? void 0 : name.includes('attachment;filename=')) {
                name = name.replace('attachment;filename=', '').replace(new RegExp('"', 'g'), '');
            }
            else {
                name = `${new Date().getTime()}.xlsx`;
            }
            fileName = decodeURI(name);
        }
        // 判断返回值是数据流还是json对象
        let msg = null;
        const fileReader = new FileReader();
        fileReader.onload = function () {
            if (response.data.type == 'application/json') {
                msg = fileReader.result;
            }
            else {
                linkDown(response.data, fileName);
            }
        };
        fileReader.onloadend = function () {
            resolve(JSON.parse(msg));
        };
        fileReader.readAsText(response.data);
    });
}
exports.exportFile = exportFile;
// 模拟点击下载
function linkDown(blob, aName) {
    const downloadElement = document.createElement('a');
    downloadElement.style.display = 'none';
    downloadElement.href = URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.download = aName;
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    URL.revokeObjectURL(downloadElement.href); // 释放URL对象
    document.body.removeChild(downloadElement); // 下载完成移除元素
}
