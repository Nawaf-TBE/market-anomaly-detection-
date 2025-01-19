import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const dummyData = [
  { time: "09:30", value: 100 },
  { time: "10:00", value: 105 },
  { time: "10:30", value: 98 },
  { time: "11:00", value: 102 },
  { time: "11:30", value: 107 },
  { time: "12:00", value: 109 },
];

export const MarketChart = () => {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dummyData}>
          <XAxis dataKey="time" stroke="#CCD6F6" />
          <YAxis stroke="#CCD6F6" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#112240",
              border: "none",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#64FFDA"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};