import { AnomalyPrediction } from "@/types/market";

export interface StrategyRecommendation {
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  reasoning: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  expectedReturn: number;
}

class InvestmentStrategyService {
  generateRecommendation(prediction: AnomalyPrediction): StrategyRecommendation {
    // Basic strategy logic based on anomaly prediction
    if (prediction.isAnomaly) {
      return {
        action: 'SELL',
        confidence: prediction.confidence,
        reasoning: "High probability of market anomaly detected. Recommend reducing exposure to protect capital.",
        riskLevel: 'HIGH',
        expectedReturn: -prediction.probability * 10 // Estimated potential loss
      };
    }

    if (prediction.probability > 0.5) {
      return {
        action: 'HOLD',
        confidence: 1 - prediction.probability,
        reasoning: "Elevated risk detected. Maintain current positions but avoid new exposure.",
        riskLevel: 'MEDIUM',
        expectedReturn: 0
      };
    }

    return {
      action: 'BUY',
      confidence: 1 - prediction.probability,
      reasoning: "Market conditions appear stable. Opportunity for strategic position building.",
      riskLevel: 'LOW',
      expectedReturn: (1 - prediction.probability) * 5 // Estimated potential gain
    };
  }
}

export const investmentStrategy = new InvestmentStrategyService();