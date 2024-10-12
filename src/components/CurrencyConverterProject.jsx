import React, { useEffect, useState } from "react";
import CurrencyDropdown from "./CurrencyDropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

function CurrencyConverterProject() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrencies] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("favourites")) || ["INR", "EUR"]);

  // fetch API
  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error Fetching", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const CurrencyConvert = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error("Error Fetching", error);
    } finally {
      setConverting(false);
    }
  };

  const handleFavourite = (currency) => {
    let updatedFavourites = [...favourites];
    if (favourites.includes(currency)) {
      updatedFavourites = updatedFavourites.filter((fav) => fav !== currency);
    } else {
      updatedFavourites.push(currency);
    }
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  const swapCurrencies = () => {
    setFromCurrencies(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-8 bg-white rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl">
      <h2 className="mb-5 text-3xl font-bold text-gray-800">
        Currency Converter
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
        <div>
          <CurrencyDropdown
            favourites={favourites}
            currencies={currencies}
            title="From:"
            currency={fromCurrency}
            setCurrency={setFromCurrencies}
            handleFavourite={handleFavourite}
          />
        </div>
        {/* Swap currency button */}
        <div className="flex justify-center">
          <button
            onClick={swapCurrencies}
            className="p-3 bg-blue-100 rounded-full shadow-md cursor-pointer hover:bg-blue-200 transition duration-200 transform hover:scale-110"
          >
            <HiArrowsRightLeft className="text-2xl text-blue-600" />
          </button>
        </div>
        <div>
          <CurrencyDropdown
            favourites={favourites}
            currencies={currencies}
            title="To:"
            currency={toCurrency}
            setCurrency={setToCurrency}
            handleFavourite={handleFavourite}
          />
        </div>
      </div>
      <div className="mt-6">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-600"
        >
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
      <div className="flex justify-end mt-8">
        <button
          onClick={CurrencyConvert}
          className={`px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            converting ? "animate-pulse" : ""
          }`}
        >
          {converting ? "Converting..." : "Convert"}
        </button>
      </div>
      {convertedAmount && (
        <div className="mt-6 text-lg font-medium text-right text-green-600">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
}

export default CurrencyConverterProject;
