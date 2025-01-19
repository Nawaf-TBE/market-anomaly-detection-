import { MarketData, AnomalyPrediction } from "@/types/market";

// Simple statistical approach for initial implementation
export class AnomalyDetectionService {
  private readonly VOLATILITY_THRESHOLD = 2.0; // Standard deviations
  private readonly VOLUME_THRESHOLD = 1.5; // Standard deviations
  private historicalData: MarketData[] = [];

  constructor() {
    this.historicalData = [];
  }

  private calculateStats(values: number[]) {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
    return { mean, stdDev: Math.sqrt(variance) };
  }

  public addDataPoint(data: MarketData) {
    this.historicalData.push(data);
    if (this.historicalData.length > 100) {
      this.historicalData.shift();
    }
  }

  public predict(currentData: MarketData): AnomalyPrediction {
    if (this.historicalData.length < 30) {
      return {
        timestamp: currentData.time,
        probability: 0,
        isAnomaly: false,
        confidence: 0
      };
    }

    const volatilities = this.historicalData.map(d => d.volatility);
    const volumes = this.historicalData.map(d => d.volume);
    
    const volStats = this.calculateStats(volatilities);
    const volumeStats = this.calculateStats(volumes);

    const volatilityScore = Math.abs(currentData.volatility - volStats.mean) / volStats.stdDev;
    const volumeScore = Math.abs(currentData.volume - volumeStats.mean) / volumeStats.stdDev;

    const anomalyProbability = (volatilityScore + volumeScore) / (this.VOLATILITY_THRESHOLD + this.VOLUME_THRESHOLD);
    
    return {
      timestamp: currentData.time,
      probability: Math.min(anomalyProbability, 1),
      isAnomaly: anomalyProbability > 1,
      confidence: Math.min(0.5 + (anomalyProbability * 0.5), 1)
    };
  }
}

export const anomalyService = new AnomalyDetectionService();