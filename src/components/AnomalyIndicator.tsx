import { useState, useEffect } from "react";
import { anomalyService } from "@/services/anomalyDetection";
import { AnomalyPrediction } from "@/types/market";
import { useToast } from "@/hooks/use-toast";

export const AnomalyIndicator = () => {
  const [prediction, setPrediction] = useState<AnomalyPrediction | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate real-time market data
    const interval = setInterval(() => {
      const mockData = {
        time: new Date().toISOString(),
        value: Math.random() * 100,
        volume: Math.random() * 1000000,
        volatility: Math.random() * 0.5
      };

      anomalyService.addDataPoint(mockData);
      const newPrediction = anomalyService.predict(mockData);
      setPrediction(newPrediction);

      if (newPrediction.isAnomaly) {
        toast({
          title: "Market Anomaly Detected",
          description: `Confidence: ${(newPrediction.confidence * 100).toFixed(1)}%`,
          variant: "destructive",
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (!prediction) return "bg-primary-foreground";
    if (prediction.isAnomaly) return "bg-danger";
    return prediction.probability > 0.5 ? "bg-warning" : "bg-primary-foreground";
  };

  const getStatusText = () => {
    if (!prediction) return "Initializing";
    if (prediction.isAnomaly) return "Anomaly Detected";
    return prediction.probability > 0.5 ? "Warning" : "Normal";
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className={`w-24 h-24 rounded-full ${getStatusColor()} animate-pulse`} />
      <span className="text-lg font-mono text-secondary-foreground capitalize">
        Status: {getStatusText()}
      </span>
      {prediction && (
        <div className="text-sm font-mono text-secondary-foreground/70">
          Confidence: {(prediction.confidence * 100).toFixed(1)}%
        </div>
      )}
    </div>
  );
};