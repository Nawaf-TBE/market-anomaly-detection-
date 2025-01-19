import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpCircle, ArrowDownCircle, MinusCircle } from "lucide-react";
import { anomalyService } from "@/services/anomalyDetection";
import { investmentStrategy } from "@/services/investmentStrategy";
import type { StrategyRecommendation as StrategyRecommendationType } from "@/services/investmentStrategy";
import { useToast } from "@/components/ui/use-toast";
import { InvestmentBot } from "./InvestmentBot";

export const StrategyRecommendation: React.FC = () => {
  const [recommendation, setRecommendation] = useState<StrategyRecommendationType | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let isSubscribed = true;

    const updateRecommendation = () => {
      try {
        const mockData = {
          time: new Date().toISOString(),
          value: Math.random() * 100,
          volume: Math.random() * 1000000,
          volatility: Math.random() * 0.5
        };

        const prediction = anomalyService.predict(mockData);
        if (!isSubscribed) return;
        
        const newRecommendation = investmentStrategy.generateRecommendation(prediction);
        setRecommendation(newRecommendation);
      } catch (error) {
        console.error('Error updating recommendation:', error);
        toast({
          title: "Error updating recommendation",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    };

    // Initial update
    updateRecommendation();
    
    const interval = setInterval(updateRecommendation, 5000);

    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, [toast]);

  if (!recommendation) {
    return (
      <Card className="p-6 bg-secondary">
        <div className="flex items-center justify-center h-40">
          <p className="text-secondary-foreground">Loading recommendation...</p>
        </div>
      </Card>
    );
  }

  const getActionIcon = () => {
    switch (recommendation.action) {
      case 'BUY':
        return <ArrowUpCircle className="w-8 h-8 text-primary" />;
      case 'SELL':
        return <ArrowDownCircle className="w-8 h-8 text-danger" />;
      default:
        return <MinusCircle className="w-8 h-8 text-warning" />;
    }
  };

  const getRiskBadgeColor = () => {
    switch (recommendation.riskLevel) {
      case 'LOW':
        return 'bg-primary text-primary-foreground';
      case 'MEDIUM':
        return 'bg-warning text-warning-foreground';
      case 'HIGH':
        return 'bg-danger text-danger-foreground';
    }
  };

  return (
    <Card className="p-6 bg-secondary">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-mono text-secondary-foreground">Strategy Recommendation</h2>
        <Badge className={getRiskBadgeColor()}>
          {recommendation.riskLevel} RISK
        </Badge>
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        {getActionIcon()}
        <div>
          <h3 className="text-2xl font-mono text-primary-foreground">{recommendation.action}</h3>
          <p className="text-sm text-secondary-foreground/70">
            Confidence: {(recommendation.confidence * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <p className="text-sm text-secondary-foreground mb-4">{recommendation.reasoning}</p>
      
      <div className="flex justify-between items-center text-sm font-mono mb-4">
        <span className="text-secondary-foreground/70">Expected Return:</span>
        <span className={recommendation.expectedReturn >= 0 ? 'text-primary' : 'text-danger'}>
          {recommendation.expectedReturn.toFixed(1)}%
        </span>
      </div>

      <div className="flex justify-end">
        <InvestmentBot recommendation={recommendation} />
      </div>
    </Card>
  );
};