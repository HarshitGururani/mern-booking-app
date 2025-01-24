import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] border border-gray-300 rounded-lg gap-4 md:gap-8 p-3 md:p-8">
      <div className="w-full h-[300px] rounded overflow-hidden">
        <img
          src={hotel.imageUrls[0]}
          alt="hotel images"
          className="w-full h-full object-cover object-center "
        />
      </div>
      <div className="grid grid-rows-1 md:grid-rows-[1fr_2fr_1fr] gap-4">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>

          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl cursor-pointer font-bold"
          >
            {hotel.name}
          </Link>
        </div>

        <div className="">
          <p className="line-clamp-2 md:line-clamp-4">{hotel.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-end whitespace-nowrap gap-2 md:gap-0">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="bg-tint2 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">₹{hotel.pricePerNight} per night</span>

            <Link
              to={`/detail/${hotel._id}`}
              className="bg-primary text-white h-full p-2 font-bold text-lg max-w-fit hover:bg-orange-400 rounded-lg"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchResultsCard;
