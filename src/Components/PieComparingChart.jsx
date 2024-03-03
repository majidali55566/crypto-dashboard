/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import TopMarketCapturesOffline from "../TopMarketCaptures.json";
import Circle from "./Circle";
const PieComparingChart = () => {
  const [piaData, setPiaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `sdgdshttps://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false`
        );
        if (response.status === 200) {
          const mapped = response.data.map((crypto) => ({
            name: crypto.name,
            value: crypto.market_cap,
          }));
          if (mounted) {
            setPiaData(mapped);
          }
        }

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching crypto market capture data:", error);
      }
    };

    let mounted = true;
    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  const setPieChartData = (onlinePieData, offlineData) => {
    if (onlinePieData.length !== 0) {
      return onlinePieData;
    } else {
      const formattedData = offlineData.map((crypto) => ({
        name: crypto.name,
        value: crypto.market_cap,
      }));
      return formattedData;
    }
  };
  const Legend = () => {
    const data = setPieChartData(piaData, TopMarketCapturesOffline);
    return (
      <div className="custom-pie-chart-legend flex-group gap-regular">
        {data.map((crypto, index) => (
          <div
            key={`cypto-${crypto.name}`}
            className="flex-group align-items-center gap-300"
          >
            <Circle color={colors[index]} />
            <p>{crypto.name}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="pie-comparing-chart">
      <h2>Top Market Capturers</h2>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={setPieChartData(piaData, TopMarketCapturesOffline, colors)}
            innerRadius={60}
            outerRadius={80}
            fill="red"
            paddingAngle={5}
            dataKey="value"
          >
            {setPieChartData(piaData, TopMarketCapturesOffline).map(
              (entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              )
            )}
          </Pie>

          <Tooltip content={<CustomPieChartToolTip circleColors={colors} />} />
        </PieChart>
      </ResponsiveContainer>
      <Legend
        content={<Legend colors={colors} piaData={TopMarketCapturesOffline} />}
      />
    </div>
  );
};
const CustomPieChartToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div className="flex-group align-items-center gap-300">
          <p>{payload[0].name}</p>

          <Circle color={payload[0].payload.fill} />
          <p>{`$ ${payload[0].value}`}</p>
        </div>
      </div>
    );
  }
};

export default PieComparingChart;
