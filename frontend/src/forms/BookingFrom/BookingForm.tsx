import { useForm } from "react-hook-form";
import {
  paymentIntentResponse,
  UserType,
} from "../../../../backend/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../context/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { toast } from "react-toastify";

type Props = {
  currentUser: UserType;
  paymentIntent: paymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCoast: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const { mutate: bookRoom, isLoading } = useMutation(apiClient.createBooking, {
    onSuccess: () => {
      toast.success("Booking Saved!");
    },
    onError: () => {
      toast.error("Error saving booking");
    },
  });
  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCoast: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent?.id });
    }
  };
  return (
    <form
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="text-2xl md:text-3xl font-bold">
        Confirm your details
      </span>

      <div className="grid grid-cols-2 gap-3 md:gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="mt-1 w-full border rounded border-border py-2 px-3 text-gray-700 bg-muted"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="mt-1 w-full border rounded border-border py-2 px-3 text-gray-700 bg-muted"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            className="mt-1 w-full border rounded border-border py-2 px-3 text-gray-700 bg-muted"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>

      <div className="space-y2">
        <h2 className="font-semibold  text-lg">Your price summary</h2>
        <div className="bg-orange-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost : ₹{paymentIntent.totalCost.toFixed(1)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-primary text-white p-2 font-bold hover:bg-orange-400 text-md rounded-sm disabled:bg-gray-500"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Confirm booking"}
        </button>
      </div>
    </form>
  );
};
export default BookingForm;
