export interface ExchangeRoot {
    data: Exchange[]
    timestamp: number
  }
  
  export interface Exchange {
    exchangeId: string
    name: string
    rank: string
    percentTotalVolume: string
    volumeUsd: string
    tradingPairs: string
    socket: boolean
    exchangeUrl: string
    updated: number
  }
  