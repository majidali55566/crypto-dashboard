import BitCoinLineGraph from "../Components/bitCoinLineGraph";
import ETHBarChart from "../Components/ETHBarChart";
import PieComparingChart from "../Components/PieComparingChart";

function TimeSeriesRates() {
  return (
    <div className="time-series-historical-rates-container">
      <div className="time-series-analysis">
        <BitCoinLineGraph />
        <ETHBarChart />
        <PieComparingChart />
      </div>
    </div>
  );
}

export default TimeSeriesRates;
