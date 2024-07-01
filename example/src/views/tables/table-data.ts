export const useDataLoader = () => {
    const staticData = []
    for (let i = 0; i < 100; i++) {
        staticData.push({
            id: `id${i}`,
            entityName: `entityName${i}`,
            serviceName: `1`,
        })
    }

    const dataApi = params => {
        console.log('----------开始执行请求----------', params)
        return new Promise(resolve => {
            const data = {
                current: params.pageNumber,
                total: staticData.length,
                size: params.pageSize,
                records: [],
            }
            for (
                let i = (params.pageNumber - 1) * params.pageSize;
                i < params.pageNumber * params.pageSize;
                i++
            ) {
                data.records.push(staticData[i])
            }
            resolve({
                code: 0,
                data: data,
            })
        })
    }
    return {
        dataApi,
    }
}
