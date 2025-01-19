import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { anomalyService } from "@/services/anomalyDetection";

export const MetricsPanel = () => {
  const [metrics, setMetrics] = useState([
    { name: "Volatility", value: "0.00%", change: "0.0%" },
    { name: "Volume", value: "0", change: "0.0%" },
    { name: "Risk Score", value: "0.00", change: "0.0%" },
    { name: "Confidence", value: "0.0%", change: "0.0%" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const mockData = {
        time: new Date().toISOString(),
        value: Math.random() * 100,
        volume: Math.random() * 1000000,
        volatility: Math.random() * 0.5
      };

      anomalyService.addDataPoint(mockData);
      const prediction = anomalyService.predict(mockData);

      setMetrics([
        { 
          name: "Volatility", 
          value: `${(mockData.volatility * 100).toFixed(2)}%`,
          change: `${((Math.random() * 2 - 1) * 5).toFixed(1)}%`
        },
        { 
          name: "Volume", 
          value: `${(mockData.volume / 1000).toFixed(0)}K`,
          change: `${((Math.random() * 2 - 1) * 10).toFixed(1)}%`
        },
        { 
          name: "Risk Score", 
          value: (prediction.probability * 10).toFixed(2),
          change: `${((Math.random() * 2 - 1) * 3).toFixed(1)}%`
        },
        { 
          name: "Confidence", 
          value: `${(prediction.confidence * 100).toFixed(1)}%`,
          change: `${((Math.random() * 2 - 1) * 2).toFixed(1)}%`
        },
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.name} className="p-4 bg-secondary">
          <h3 className="text-sm font-mono text-secondary-foreground/70">{metric.name}</h3>
          <p className="text-2xl font-mono text-primary-foreground mt-2">{metric.value}</p>
          <span
            className={`text-sm font-mono ${
              metric.change.startsWith("-") ? "text-danger" : "text-primary-foreground"
            }`}
          >
            {metric.change}
          </span>
        </Card>
      ))}
    </div>
  );
};