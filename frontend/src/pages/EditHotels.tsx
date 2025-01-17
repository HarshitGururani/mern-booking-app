import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { toast } from "react-toastify";

const EditHotels = () => {
  const { hotelId } = useParams();

  const { data, isLoading, error } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
      onError(err) {
        console.log(err);
      },
    }
  );

  const { mutate, isLoading: editLoading } = useMutation(
    apiClient.updateMyHotelById,
    {
      onSuccess: () => {
        toast.success("Hotel updated!");
      },
      onError() {
        toast.error("Error Saving Hotel");
      },
    }
  );

  if (error || !data) {
    return (
      <span className="mt-10 text-lg text-center text-destructive">
        OOPS! Something went wrong. Please try again later.
      </span>
    );
  }

  if (isLoading) {
    return (
      <span className="mt-10 text-center text-lg text-primary animate-bounce">
        Loading...
      </span>
    );
  }

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm
      hotel={data}
      onSave={handleSave}
      loading={editLoading}
      title={"Edit"}
    />
  );
};
export default EditHotels;
