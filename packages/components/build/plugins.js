// 暂未使用
export const copyFilesAfterBuild = (source, target) => {
    return {
        name: 'copy-files-after-build', // 插件名
        closeBundle: () => {
            if (Array.isArray(source) && Array.isArray(target)) {
                if (source.length !== target.length) {
                    console.error('Source and target must have the same length')
                } else {
                    try {
                        source.forEach((src, index) => {
                            fs.copySync(src, target[index])
                        })
                        console.log('Fonts copied successfully.')
                    } catch (err) {
                        console.error('Error copying fonts:', err)
                    }
                }
            } else {
                console.error('Source and target must be an array')
            }
        },
    }
}
