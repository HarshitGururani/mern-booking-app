import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
  const { data: hotels } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-center text-xl font-bold text-primary">
        No Bookings Found
      </div>
    );
  }

  return (
    <div className="space-y-5 mt-4">
      <h1 className="text-2xl font-bold">My Bookings</h1>

      {hotels.map((hotel) => (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] border border-border rounded-lg p-4 md:p-8 gap-6 md:gap-16">
          <div className="lg:w-full lg:h-[250px]" key={hotel.name}>
            <img
              src={hotel.imageUrls[0]}
              alt=""
              className="w-full h-full object-cover object-center rounded-sm"
            />
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto max-h[300px]">
            <div className="text-2xl font-bold">{hotel.name}</div>

            <div className="text-xs font-normal">
              {hotel.city}, {hotel.country}
            </div>

            {hotel.bookings.map((booking) => (
              <div>
                <div>
                  <span className="font-bold mr-2">Dates:</span>
                  <span className="">
                    {new Date(booking.checkIn).toDateString()}
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>

                <div>
                  <span className="font-bold mr-2">Guests:</span>
                  <span>
                    {booking.adultCount} Adults, {booking.childCount} children
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default MyBookings;
