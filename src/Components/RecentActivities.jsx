function RecentActivities() {
  return (
    <div className="recent-activities">
      <h1>Recent Activities</h1>
      <div className="coin-activities-container">
        <img src="/images/coins/coin1.png" alt="" />
        <p>Bitcoin</p>
        <p>10:45:16 AM</p>
        <p>+1545,00</p>
        <p className="color-primary-500">Completed</p>
      </div>
      <div className="coin-activities-container">
        <img src="/images/coins/coin3.png" alt="" />
        <p>Ethereum</p>
        <p>12:45:16 PM</p>
        <p>+1145,00</p>
        <p className="color-secondary-600">pending</p>
      </div>
      <div className="coin-activities-container">
        <img src="/images/coins/coin2.png" alt="" />
        <p>LTC</p>
        <p>06:45:16 PM</p>
        <p>+1345,00</p>
        <p className="color-primary-500">Completed</p>
      </div>
    </div>
  );
}

export default RecentActivities;
