import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { MdCurrencyRupee } from "react-icons/md";
import { BiHotel, BiStar } from "react-icons/bi";

const Myhotels = () => {
  const { data: hotelData } = useQuery("fetchMyHotels", apiClient.myHotels, {
    onError: (error: Error) => {
      console.log(error);
    },
  });

  if (!hotelData) {
    return (
      <span className="text-primary text-2xl font-bold flex items-center justify-center my-10 animate-bounce">
        No hotels Found
      </span>
    );
  }

  return (
    <div className="space-y-5 my-10">
      <span className="flex justify-between mb-10">
        <h1 className="font-bold text-2xl md:text-3xl text-primary">
          My Hotels
        </h1>
        <Link
          to={"/add-hotel"}
          className="flex bg-primary text-white text-base md:text-lg font-bold p-2 hover:bg-tint rounded px-3"
        >
          Add Hotel
        </Link>
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
        {hotelData?.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-col gap-4 justify-between border-border rounded-lg p-4 md:p-8 bg-accent shadow-md "
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line text-muted-foreground">
              {hotel.description}
            </div>

            <div className="flex flex-grow flex-wrap gap-4">
              <div className="border border-border rounded-md p-3 flex items-center">
                <BsMap className="text-primary size-4 mr-1" />
                {hotel.city}, {hotel.country}
              </div>

              <div className="border border-border rounded-md p-3 flex items-center">
                <BsBuilding className="text-primary size-4 mr-1" />
                {hotel.type}
              </div>

              <div className="border border-border rounded-md p-3 flex items-center">
                <MdCurrencyRupee className="text-primary size-4 mr-1" />
                {hotel.pricePerNight} per night
              </div>

              <div className="border border-border rounded-md p-3 flex items-center">
                <BiHotel className="text-primary size-5 mr-1" />
                {hotel.adultCount} adults ,{hotel.childCount} children
              </div>

              <div className="border border-border rounded-md p-3 flex items-center">
                <BiStar className="text-primary size-5 mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-primary text-white text-base md:text-lg font-bold p-2 hover:bg-tint rounded px-3"
              >
                View details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Myhotels;
