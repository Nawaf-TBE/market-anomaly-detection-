import { MarketChart } from "../components/MarketChart";
import { AnomalyIndicator } from "../components/AnomalyIndicator";
import { MetricsPanel } from "../components/MetricsPanel";
import { HistoricalView } from "../components/HistoricalView";
import { StrategyRecommendation } from "../components/StrategyRecommendation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Market Anomaly Detection
          </h1>
          <p className="text-secondary-foreground/80 text-lg max-w-2xl mx-auto">
            Advanced market monitoring system powered by AI to detect anomalies and provide real-time investment insights
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl shadow-lg p-6 border border-secondary/20">
              <h2 className="text-xl font-mono text-card-foreground mb-4">Market Overview</h2>
              <MarketChart />
            </div>

            <div className="bg-card rounded-xl shadow-lg p-6 border border-secondary/20">
              <h2 className="text-xl font-mono text-card-foreground mb-4">Key Metrics</h2>
              <MetricsPanel />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-xl shadow-lg p-6 border border-secondary/20">
              <h2 className="text-xl font-mono text-card-foreground mb-4">Anomaly Status</h2>
              <AnomalyIndicator />
            </div>

            <div className="bg-card rounded-xl shadow-lg border border-secondary/20">
              <StrategyRecommendation />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl shadow-lg p-6 border border-secondary/20">
              <h2 className="text-xl font-mono text-card-foreground mb-4">Historical Anomalies</h2>
              <HistoricalView />
            </div>
          </div>
        </div>

        <footer className="text-center text-secondary-foreground/60 py-8">
          <p>© 2024 Market Anomaly Detection System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;