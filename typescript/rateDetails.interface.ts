export interface RateDetails {
    data: RateD
    timestamp: number
  }
  
  export interface RateD {
    id: string
    symbol: string
    currencySymbol: string
    type: string
    rateUsd: string
  }
  