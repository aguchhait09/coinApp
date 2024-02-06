export interface Hist {
    data: DaumHist[]
    timestamp: number
  }
  
  export interface DaumHist {
    priceUsd: string
    date: string
    time: number
  }