export interface RootRate {
    data: DaumRoot[]
    timestamp: number
  }
  
  export interface DaumRoot {
    id: string
    symbol: string
    currencySymbol?: string
    type: string
    rateUsd: string
  }