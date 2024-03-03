/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
function CryptoIntoCurrency({
  cryptoImg,
  cryptoName,
  currencyValue,
  growthImg,
  growthPercentage,
  isPercentagePositive,
  gainArrowImg,
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (currencyValue === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [currencyValue]);
  return (
    <div className="cryptoIntoCurrency">
      <div className="grid-flow gap-regular">
        <img src={cryptoImg} alt={`Crypto ${cryptoName} icon`} />
        <div>
          <div className="flex-group" data-customgap="half">
            <p>{cryptoName}</p>
            <img src="/images/conversion-arrows.svg" alt="conversion arrows" />
            <p>USD</p>
          </div>
          {loading ? (
            <ClipLoader />
          ) : (
            <h1 className="currency-value">{currencyValue}</h1>
          )}
        </div>
        <div className="flex-group" data-customgap="half">
          <img src={gainArrowImg} alt="profit arrow" />
          <p
            className={
              isPercentagePositive ? `color-primary-500` : `loss-color`
            }
          >
            {growthPercentage}%
          </p>
        </div>
      </div>
      <div>
        <img src={growthImg} alt="growth png" />
      </div>
    </div>
  );
}

export default CryptoIntoCurrency;
