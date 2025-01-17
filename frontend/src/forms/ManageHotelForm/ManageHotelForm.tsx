import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TbLoader2 } from "react-icons/tb";
import { HotelType as HotelData } from "../../../../backend/src/shared/types";
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import HotelType from "./HotelType";
import ImageSection from "./ImageSection";

export interface HotelFormData {
  name: string;
  city: string;
  country: string;
  description: string;
  pricePerNight: number;
  starRating: number;
  type: string;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
}

interface ManageHotelFormProps {
  hotel?: HotelData;
  title?: string;
  onSave: (HotelFormData: FormData) => void;
  loading: boolean;
}

const ManageHotelForm = ({
  onSave,
  loading,
  hotel,
  title,
}: ManageHotelFormProps) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  //Reset the form with new data
  useEffect(() => {
    reset(hotel);
  }, [reset, hotel]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();

    if (hotel) {
      formData.append("hotelId", hotel._id);
    }

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());
    formData.append("starRating", formDataJson.starRating.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form
        className="max-w-[51rem] mx-auto mt-6 mb-14 flex flex-col gap-4"
        onSubmit={onSubmit}
      >
        <DetailsSection title={title} />
        <HotelType />
        <FacilitiesSection />
        <GuestSection />
        <ImageSection />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`text-white bg-primary px-4 py-2 rounded text-lg font-bold ${
              loading && "bg-primary/35 flex items-center gap-1"
            }`}
          >
            {loading ? "Saving..." : "Save hotel"}
            {loading && <TbLoader2 className="size-5 animate-spin" />}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
export default ManageHotelForm;
