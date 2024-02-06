export interface exchange {
    data: Data
    timestamp: number
  }
  
  export interface Data {
    id: string
    name: string
    rank: string
    percentTotalVolume: string
    volumeUsd: string
    tradingPairs: string
    socket: boolean
    exchangeUrl: string
    updated: number
    exchangeId: string
  }
  