import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  hotel: HotelType;
  isLoading: boolean;
};

const LatestDestinationCard = ({ hotel, isLoading }: Props) => {
  return (
    <>
      {isLoading && (
        <div className="text-xl text-primary text-center">Loading...</div>
      )}

      <Link
        to={`/detail/${hotel._id}`}
        className="relative cursor-pointer overflow-hidden rounded-md"
      >
        <div className="h-[300px]">
          <img
            src={hotel.imageUrls[0]}
            alt="hotel image"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="absolute bottom-0 p-3 bg-black bg-opacity-50 w-full rounded-b-md">
          <span className="text-white tracking-tight text-xl">
            {hotel.name}
          </span>
        </div>
      </Link>
    </>
  );
};
export default LatestDestinationCard;
