import { TiStarOutline } from "react-icons/ti";
import { FaStar } from "react-icons/fa6";

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  favourites,
  handleFavourite,
  title = "",
}) => {
  const isFavourite = (curr) => favourites.includes(curr);

  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-600"
      >
        {title}
      </label>
      <div className="mt-2 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          {/* Render favourites */}
          {favourites.map((favCurrency) => (
            <option className="bg-gray-100" value={favCurrency} key={favCurrency}>
              {favCurrency}
            </option>
          ))}

          {/* Other currencies */}
          {currencies
            .filter((c) => !favourites.includes(c))
            .map((curr) => (
              <option value={curr} key={curr}>
                {curr}
              </option>
            ))}
        </select>

        {/* Button to toggle favourite */}
        <button
          onClick={() => handleFavourite(currency)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm leading-5"
        >
          {isFavourite(currency) ? (
            <FaStar className="text-yellow-500 hover:scale-110 transform transition" />
          ) : (
            <TiStarOutline className="text-gray-400 hover:scale-110 transform transition" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
