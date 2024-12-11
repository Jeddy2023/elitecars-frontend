import React from "react";
// import { FaChevronDown } from "react-icons/fa";

const Hero: React.FC = () => {
  return (
    <div className="relative py-10 pb-16 bg-[#f1f1f1]">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex flex-col justify-center items-center bg-hero-pattern bg-no-repeat bg-center bg-[length:80%_auto] text-center">
        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-bg-secondary">
            MAKE YOUR RIDE EASY & FAST
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-700 mb-4">
            WITH ELITE CARS
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-black mb-9">
            Rent a car to move from local hosts in 190+ countries.
          </p>
        </div>
      </div>

      {/* Form Section */}
      {/* <div className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 w-[90%] lg:w-3/4 bg-white shadow-lg rounded-lg p-6 flex flex-col lg:flex-row items-center gap-4">
        <div className="flex-1">
          <label htmlFor="fromLocation" className="block text-sm font-medium text-gray-700 mb-1">
            WHERE YOU FROM
          </label>
          <div className="relative">
            <select
              id="fromLocation"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option>Select Location</option>
              <option>New York</option>
              <option>London</option>
              <option>Tokyo</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="flex-1">
          <label htmlFor="toLocation" className="block text-sm font-medium text-gray-700 mb-1">
            WHERE YOU GO
          </label>
          <div className="relative">
            <select
              id="toLocation"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option>Select Location</option>
              <option>Los Angeles</option>
              <option>Paris</option>
              <option>Sydney</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="flex-1">
          <label htmlFor="datePicker" className="block text-sm font-medium text-gray-700 mb-1">
            CHOOSE DATES
          </label>
          <input
            type="text"
            id="datePicker"
            className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="12/02/2024 - 12/09/2024"
          />
        </div>

        <div className="flex-shrink-0">
          <button
            type="button"
            className="bg-blue-700 text-white font-medium text-lg px-6 py-3 rounded-md hover:bg-blue-800 shadow-md transition"
          >
            Search
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
