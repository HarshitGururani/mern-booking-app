import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-5 gap-2  md:gap-4 items-center"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2 rounded-sm">
        <MdTravelExplore size={24} className="mr-2" />
        <input
          type="text"
          placeholder="Where are you going"
          className="text-base w-full focus:outline-none"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2 rounded-sm">
        <label className="flex items-center text-sm md:text-base">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
          />
        </label>

        <label className="flex items-center">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
          />
        </label>
      </div>

      <div>
        <DatePicker
          selected={checkIn}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          onChange={(date) => setCheckIn(date as Date)}
          placeholderText="Check in date"
          className="w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div>
        <DatePicker
          selected={checkOut}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          onChange={(date) => setCheckOut(date as Date)}
          placeholderText="Check out date"
          className="w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex gap-1">
        <button className="w-2/3 text-white bg-black h-full p-2 font-bold text-base md:text-lg rounded">
          Search
        </button>
        <button className="w-1/3 text-white bg-destructive h-full p-2 font-bold text-base md:text-lg hover:bg-red-400 rounded">
          Clear
        </button>
      </div>
    </form>
  );
};
export default SearchBar;
