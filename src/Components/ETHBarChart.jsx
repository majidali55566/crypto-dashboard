/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import Circle from "./Circle";
import CustomTooltip from "./CustomTooltip";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
function ETHBarChart() {
  const [sevenDaysEtmData, setSevenDaysEtmData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEthSevenDaysData = async () => {
      try {
        const currentTime = new Date();
        const endTime = currentTime.toISOString();
        const threeMonthsAgo = new Date(
          currentTime.getFullYear(),
          currentTime.getMonth() - 3,
          currentTime.getDate()
        ).toISOString();

        const response = await axios.get(
          `https://rest.coinapi.io/v1/exchangerate/ETH/USD/history?period_id=1DAY&time_start=${threeMonthsAgo}&time_end=${endTime}`,
          {
            headers: {
              "X-CoinAPI-Key": "F2F7216B-030D-4E49-8E15-E6B22F632E5A",
            },
          }
        );
        if (response.status === 200) {
          setSevenDaysEtmData(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("error fetching ethereum 3monts data", error);
      }
    };
    fetchEthSevenDaysData();
  }, []);
  const ethCircleColors = ["hsl(164 100% 44%)"];
  return (
    <div>
      <div className="ethereum-bar-chart">
        <div className="flex-group align-items-center">
          <img src="/images/coins/ethereum.png" alt="" />
          <div>
            <h2>Ethereum Historical Data</h2>
            <p>(last 3 months)</p>
          </div>
        </div>
        {loading ? (
          <div className="spinner-container">
            <ClipLoader size={25} color="hsl(164 100% 44%)" loading={loading} />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sevenDaysEtmData}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis dataKey="time_period_end" tick={false} />
              <YAxis />
              <Tooltip
                content={
                  <CustomTooltip circleColors={ethCircleColors} showLabelDate />
                }
              />
              <Legend content={<CustomLegend colors={ethCircleColors} />} />
              <Bar
                dataKey="rate_close"
                fill="hsl(164 100% 84%)"
                activeFill="none"
                activeBar={
                  <Rectangle
                    fill="hsl(164 100% 44%)
            "
                    stroke="none"
                  />
                }
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
const CustomLegend = ({ colors }) => {
  return (
    <div>
      <div className="custom-eth-legend-barchart flex-group gap-300 align-items-center">
        <Circle color={colors[0]} />
        <p>close rate</p>
      </div>
    </div>
  );
};

export default ETHBarChart;
