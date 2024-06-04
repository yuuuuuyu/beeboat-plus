export const useDataLoader = staticData => {
    const dataApi = params => {
        return new Promise(resolve => {
            const data = {
                current: params.pageNumber,
                total: 100,
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
