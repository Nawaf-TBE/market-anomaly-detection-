export interface MarketData {
  time: string;
  value: number;
  volume: number;
  volatility: number;
}

export interface AnomalyPrediction {
  timestamp: string;
  probability: number;
  isAnomaly: boolean;
  confidence: number;
}