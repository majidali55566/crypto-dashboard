/* eslint-disable react/prop-types */
import { useState } from "react";
import buySalesData from "../buyAndsales.json";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Area, AreaChart } from "recharts";
import CustomTooltip from "./CustomTooltip";
import Circle from "./Circle";
function MarketOverview() {
  const [selectedBuySaleData, SetselectedBuySaleData] = useState("all");

  const handleSelectData = (timePeriod) => {
    SetselectedBuySaleData(timePeriod);
  };
  const marketOverviewCircleColors = [
    "hsl(164 100% 44%)",
    "hsl(242, 58%, 58%)",
  ];

  return (
    <div className="market-overview grid-col-span-3">
      <div className="card-top-bar">
        <div>
          <h1>Market Overview</h1>
          <p className="color-primary-500">7.2141,997.5 (25%)</p>
        </div>
        <div className="time-period-container flex-group">
          <button
            className={selectedBuySaleData === "all" ? "selectedButton" : ""}
            onClick={() => handleSelectData("all")}
          >
            All
          </button>
          <button
            className={selectedBuySaleData === "1month" ? "selectedButton" : ""}
            onClick={() => handleSelectData("1month")}
          >
            1M
          </button>
          <button
            className={
              selectedBuySaleData === "6months" ? "selectedButton" : ""
            }
            onClick={() => handleSelectData("6months")}
          >
            6M
          </button>
          <button
            className={selectedBuySaleData === "1year" ? "selectedButton" : ""}
            onClick={() => handleSelectData("1year")}
          >
            1Y
          </button>
          <button
            className={selectedBuySaleData === "ytd" ? "selectedButton" : ""}
            onClick={() => handleSelectData("ytd")}
          >
            YTD
          </button>
        </div>
      </div>
      <div className="line-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            height={320}
            data={buySalesData.data[selectedBuySaleData]}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5A55D2" stopOpacity={0.8} />
                <stop offset="70%" stopColor="#5A55D2" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#18BFEF" stopOpacity={0.8} />
                <stop offset="70%" stopColor="#D3FF76" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="timestamp" hide={true} tick={false} />
            <YAxis hide={true} tick={false} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              content={
                <CustomTooltip circleColors={marketOverviewCircleColors} />
              }
            />
            <Legend
              content={<CustomLegend colors={marketOverviewCircleColors} />}
            />
            <Area
              type="monotone"
              dataKey="buyPrice"
              stroke="#5A55D2"
              fillOpacity={1}
              fill="url(#colorUv)"
              activeDot={{ fill: "#5A55D2" }}
              strokeWidth={3}
            />
            <Area
              type="monotone"
              dataKey="sellPrice"
              stroke="#00DEA3"
              fillOpacity={1}
              fill="url(#colorPv)"
              activeDot={{ fill: "#00DEA3" }}
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
const CustomLegend = ({ colors }) => {
  return (
    <div className="flex-group gap-regular">
      <div className="flex-group gap-300 align-items-center">
        <Circle color={colors[0]} />
        <p>Buy</p>
      </div>
      <div className="flex-group gap-300 align-items-center">
        <Circle color={colors[1]} />
        <p>Sell</p>
      </div>
    </div>
  );
};
export default MarketOverview;
