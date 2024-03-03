/* eslint-disable react/prop-types */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import axios from "axios";
import { useEffect, useState } from "react";
import Circle from "./Circle";
import CustomTooltip from "./CustomTooltip";
import ClipLoader from "react-spinners/ClipLoader";
function BitCoinLineGraph() {
  const [bitcoinMonthlyData, setBitcoinMonthlyData] = useState([]);
  const [bitcoin24HourlyData, setBitcoin24HourlyData] = useState([]);
  const [bitcoinYearlyData, setBitcoinYearlyData] = useState([]);
  const [selectedTimeLine, setSelectedTimeLine] = useState("24hrs");
  const [loading, setLoading] = useState(true);

  const selectedTimeLineIs = (timeLine) => selectedTimeLine === timeLine;
  useEffect(() => {
    const fetchBitcoinTimeSeriesData = async () => {
      try {
        const bitCoinTimeSeriesUri =
          generateBitcoinTimeSeriesUri(selectedTimeLine);

        const response = await axios.get(bitCoinTimeSeriesUri, {
          headers: {
            "X-CoinAPI-Key": "F2F7216B-030D-4E49-8E15-E6B22F632E5A",
          },
        });
        if (response.status === 200) {
          setLoading(false);
        }
        if (selectedTimeLineIs("24hrs")) {
          setBitcoin24HourlyData(response.data);
        } else if (selectedTimeLineIs("1month")) {
          setBitcoinMonthlyData(response.data);
        } else {
          setBitcoinYearlyData(response.data);
        }
      } catch (error) {
        setLoading(true);
        console.log("Error fetching historical bitcoin data" + error.message);
      }
    };
    fetchBitcoinTimeSeriesData();
  }, [selectedTimeLine]);

  function generateBitcoinTimeSeriesUri(selectedTimeframe) {
    const currentDate = new Date();
    let startTime;
    let uri = "";
    let endTime = currentDate.toISOString(); // Use ISOString for consistent format

    if (selectedTimeLineIs("1month")) {
      startTime = new Date(
        currentDate.setDate(currentDate.getDate() - 30)
      ).toISOString();
      uri = `https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=1DAY&time_start=${startTime}&time_end=${endTime}`;
    } else if (selectedTimeLineIs("24hrs")) {
      startTime = new Date(
        currentDate.setHours(currentDate.getHours() - 24)
      ).toISOString();
      uri = `https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=1HRS&time_end=${endTime}&limit=24`;
    } else if (selectedTimeLineIs("1year")) {
      startTime = new Date(
        currentDate.setFullYear(currentDate.getFullYear() - 1)
      ).toISOString();
      uri = `https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=1DAY&time_start=${startTime}&time_end=${endTime}&limit=365`;
    } else {
      throw new Error(`Invalid timeframe: ${selectedTimeframe}`); // Handle unexpected timeframes
    }

    return uri;
  }

  const handleTimeInterval = (timeInterval) => {
    setSelectedTimeLine(timeInterval);
  };
  const CircleColorsbtcLineGraph = ["rgb(0, 222, 163)", "#868cff", "red"];
  return (
    <div className="bitcoin-line-graph">
      <div className="flex-group justify-space-between flex-wrap gap-300">
        <div className="flex-group align-items-center gap-300">
          <img src="/images/coins/bitcoin.png" alt="" />
          <h2>Bitcoin historical Data</h2>
        </div>
        <div className="time-line-button-group">
          <TimeIntervalButton
            timeInterval="24hrs"
            label="24 hrs"
            selectedTimeLine={selectedTimeLine}
            handleTimeInterval={handleTimeInterval}
          />
          <TimeIntervalButton
            timeInterval="1month"
            label="30 days"
            selectedTimeLine={selectedTimeLine}
            handleTimeInterval={handleTimeInterval}
          />
          <TimeIntervalButton
            timeInterval="1year"
            label="1 year"
            selectedTimeLine={selectedTimeLine}
            handleTimeInterval={handleTimeInterval}
          />
        </div>
      </div>
      {loading ? (
        <div className="spinner-container">
          <ClipLoader size={25} color="hsl(164 100% 44%)" loading={loading} />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            height={320}
            data={
              selectedTimeLineIs("24hrs")
                ? bitcoin24HourlyData
                : selectedTimeLineIs("1month")
                ? bitcoinMonthlyData
                : bitcoinYearlyData
            }
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis dataKey="time_close" tick={false} />
            <YAxis />
            <Tooltip
              content={
                <CustomTooltip
                  showLabelDate={true}
                  circleColors={CircleColorsbtcLineGraph}
                />
              }
            />
            <Legend
              content={<CustomLegend colors={CircleColorsbtcLineGraph} />}
            />
            <Line
              type="monotone"
              dataKey="rate_close"
              stroke="#00DEA3"
              activeDot={{ r: 5 }}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="rate_high"
              stroke="#868CFF"
              activeDot={{ r: 5 }}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="rate_low"
              stroke="red"
              activeDot={{ r: 5 }}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

const CustomLegend = ({ colors }) => {
  return (
    <div className="custom-legend">
      <div className="legend-item">
        <Circle color={colors[0]} />
        <p>close rate</p>
      </div>
      <div className="legend-item">
        <Circle color={colors[1]} />
        <p>high rate</p>
      </div>
      <div className="legend-item">
        <Circle color={colors[2]} />
        <p>low rate</p>
      </div>
    </div>
  );
};
const TimeIntervalButton = ({
  timeInterval,
  label,
  selectedTimeLine,
  handleTimeInterval,
}) => (
  <button
    className={selectedTimeLine === timeInterval ? "selected-button" : ""}
    onClick={() => handleTimeInterval(timeInterval)}
  >
    {label}
  </button>
);
export default BitCoinLineGraph;
