import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { toast } from "react-toastify";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      toast.success("Hotel Saved!");
    },
    onError(error: Error) {
      toast.error(error.message);
    },
  });

  const handleSave = (HotelFormData: FormData) => {
    mutate(HotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} loading={isLoading} />;
};
export default AddHotel;
