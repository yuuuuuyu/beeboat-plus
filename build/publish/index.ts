import { run } from '../../build/utils'

// 发布组件
export const publish = async () => {
    // 在dist目录下执行发布命令
    await run(
        'npm publish --registry=https://nexus.hive-df.com/repository/bt-npm-hosted/',
        '../../dist',
    )
}
