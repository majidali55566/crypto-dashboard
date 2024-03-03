import { useEffect, useState } from "react";
import axios from "axios";
import AddBalances from "../Components/AddBalances";
import CryptoIntoCurrency from "../Components/CryptoIntoCurrency";
import MarketOverview from "../Components/MarketOverview";
import RecentActivities from "../Components/RecentActivities";
import Team from "../Components/Team";

function Dashboard() {
  const [cryptoCards, setCryptoCards] = useState([
    {
      cryptoImg: "/images/coins/coin1.png",
      cryptoName: "BTC",
      currencyValue: "9784.79",
      growthImg: "/images/positive-growth.png",
      profitePercentage: "7.2",
      isPercentagePositive: true,
      gainArrowImg: "/images/profit-arrow.svg",
    },
    {
      cryptoImg: "/images/coins/coin2.png",
      cryptoName: "LTC",
      currencyValue: "8741.19",
      growthImg: "/images/negative-growth.png",
      isPercentagePositive: false,
      profitePercentage: "5.2",
      gainArrowImg: "/images/loss-arrow.svg",
    },
    {
      cryptoImg: "/images/coins/coin3.png",
      cryptoName: "ETH",
      currencyValue: "4567.16",
      growthImg: "/images/positive-growth.png",
      isPercentagePositive: true,
      profitePercentage: "6.5",
      gainArrowImg: "/images/profit-arrow.svg",
    },
    {
      cryptoImg: "/images/coins/coin4.png",
      cryptoName: "BNB",
      currencyValue: "6547.79",
      growthImg: "/images/positive-growth.png",
      isPercentagePositive: true,
      profitePercentage: "9.5",
      gainArrowImg: "/images/profit-arrow.svg",
    },
  ]);

  const [exchangeRates, setExchangeRates] = useState({
    BTC: 0,
    LTC: 0,
    ETH: 0,
    BNB: 0,
  });

  useEffect(() => {
    const fetchExchangeRateForCurrency = async (currency, retries = 4) => {
      try {
        const response = await axios.get(
          `https://rest.coinapi.io/v1/exchangerate/${currency}/USD`,
          {
            headers: {
              "X-CoinAPI-Key": "F2F7216B-030D-4E49-8E15-E6B22F632E5A",
            },
          }
        );

        setExchangeRates((prevRates) => ({
          ...prevRates,
          [currency]: response.data.rate,
        }));
      } catch (error) {
        console.error(`Error fetching ${currency} exchange rate:`);
        if (retries > 0) {
          // Retry the request with one less retry attempt
          setTimeout(() => {
            fetchExchangeRateForCurrency(currency, retries - 1);
          }, 1000); // You can adjust the delay between retries as needed
        }
      }
    };

    // Fetch exchange rates for each currency separately
    const currencies = ["BTC", "LTC", "ETH", "BNB"];
    currencies.forEach((currency) => {
      fetchExchangeRateForCurrency(currency);
    });
  }, []);

  const updateCryptoCards = () => {
    const updatedCryptoCards = cryptoCards.map((card) => ({
      ...card,
      currencyValue: parseFloat(exchangeRates[card.cryptoName].toFixed(2)),
    }));

    setCryptoCards(updatedCryptoCards);
  };

  useEffect(() => {
    updateCryptoCards();
  }, [exchangeRates]);

  return (
    <div className="dashboard">
      <div className="layout">
        {cryptoCards.map((cryptoData, index) => (
          <CryptoIntoCurrency key={index} {...cryptoData} />
        ))}
        <MarketOverview />
        <AddBalances />
        <RecentActivities />
        <Team />
      </div>
    </div>
  );
}

export default Dashboard;
