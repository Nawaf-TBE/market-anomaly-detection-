import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const historicalData = [
  { date: "Jan", anomalies: 2 },
  { date: "Feb", anomalies: 1 },
  { date: "Mar", anomalies: 4 },
  { date: "Apr", anomalies: 0 },
  { date: "May", anomalies: 3 },
  { date: "Jun", anomalies: 1 },
];

export const HistoricalView = () => {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={historicalData}>
          <XAxis dataKey="date" stroke="#CCD6F6" />
          <YAxis stroke="#CCD6F6" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#112240",
              border: "none",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="anomalies" fill="#64FFDA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};