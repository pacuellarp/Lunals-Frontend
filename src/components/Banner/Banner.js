import { useState, useEffect } from "react";

const Banner = ({ message, duration = 2000, buyingOrRemoving }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    setIsVisible(true);

    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [duration]);

  useEffect(() => {
    let symbol0;
    const handleSymbol = () => {
      if (buyingOrRemoving == "buying") {
        symbol0 = "✓";
      } else {
        symbol0 = "✗";
      }
      setSymbol(symbol0);
    };

    handleSymbol();
  }, [buyingOrRemoving]);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full ${
        buyingOrRemoving == "buying" ? "bg-green-600" : "bg-red-600"
      } p-4 ${
        isVisible
          ? "translate-y-0 transition-transform duration-300 ease-in-out"
          : "translate-y-full transform transition-transform duration-300 ease-in-out"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-white">{message}</p>
        <div className="text-white">{`${symbol}`}</div>
      </div>
    </div>
  );
};

export default Banner;
