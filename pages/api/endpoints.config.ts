export const endpoints = {
    fetchData: {
        assets: "/v2/assets",
        singleAssets: (id: any)=> `/v2/assets/${id}`,
        historyAssets: (id: any)=> `/v2/assets/${id}/history?interval=d1`,
        assetMarket: (id: any) => `/v2/assets/${id}/markets`,
        rate: "/v2/rates",
        singleRate: (id: any)=> `/v2/rates/${id}`,
        exchanges: "/v2/exchanges",
        singleExchange: (id: any)=> `/v2/exchanges/${id}`,
        market: "/v2/markets",
    }
}