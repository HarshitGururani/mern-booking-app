import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useSearchContext } from "../context/SearchContext";
import BookingForm from "../forms/BookingFrom/BookingForm";
import BookingDetailSummary from "../components/BookingDetailSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../context/AppContext";

const Booking = () => {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberofNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const { data: paymentIntentData } = useQuery(
    ["createPaymentIntent", hotelId, numberofNights],
    () => apiClient.createPaymentIntent(hotelId as string, numberofNights),
    {
      enabled: !!hotelId && numberofNights > 0,
    }
  );

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser,
    {
      onSuccess: () => {
        console.log("");
      },
    }
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center mt-5">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] w-full gap-3 md:gap-1">
        <BookingDetailSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberofNights={numberofNights}
          hotel={hotel}
        />

        {currentUser && paymentIntentData && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: paymentIntentData.clientSecret,
            }}
          >
            <BookingForm
              currentUser={currentUser}
              paymentIntent={paymentIntentData}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};
export default Booking;
