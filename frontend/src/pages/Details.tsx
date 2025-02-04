import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/ManageHotelForm/GuestInfoForm/GuestInfoForm";

const Details = () => {
  const { hotelId } = useParams();

  const { data: hotel, isLoading } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <>not</>;
  }

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div className="space-y-6  my-8">
      <div>
        <span className="flex ">
          {Array.from({ length: hotel.starRating }).map((_, id) => (
            <AiFillStar className="fill-yellow-400" key={id} />
          ))}
        </span>
        <h2 className="text-3xl font-bold">{hotel.name}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel.imageUrls.map((image, id) => (
          <div className="h-[250px]" key={id}>
            <img
              src={image}
              alt={hotel.name}
              className="object-cover object-center rounded-md w-full h-full"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel.facilities.map((facility, id) => (
          <div className="border border-slate-300 rounded-md p-3" key={id}>
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel.description}</div>

        <div className="h-fit">
          <GuestInfoForm
            hotelId={hotel._id}
            pricePerNight={hotel.pricePerNight}
          />
        </div>
      </div>
    </div>
  );
};
export default Details;
