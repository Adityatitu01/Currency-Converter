import React, { useState } from 'react';

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');

  // Swap function
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
         style={{ backgroundColor:"crimson" }}>
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Currency Converter</h1>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-gray-600 text-lg mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* From and To Currency Selectors */}
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label className="block text-gray-600 text-lg mb-2">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-gray-600 text-lg mb-2">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center mb-6">
          <button 
            onClick={handleSwap}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-600"
          >
            ↔️ Swap
          </button>
        </div>

        {/* Converted Amount Display */}
        <div className="text-center mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Converted Amount</h2>
          <p className="text-3xl font-bold text-blue-600 mt-4">0.00</p>
        </div>
      </div>
    </div>
  );
}

export default App;
