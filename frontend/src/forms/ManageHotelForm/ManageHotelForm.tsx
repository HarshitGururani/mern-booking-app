import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import HotelType from "./HotelType";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";
import { TbLoader2 } from "react-icons/tb";

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
  onSave: (HotelFormData: FormData) => void;
  loading: boolean;
}

const ManageHotelForm = ({ onSave, loading }: ManageHotelFormProps) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();

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
        <DetailsSection />
        <HotelType />
        <FacilitiesSection />
        <GuestSection />
        <ImageSection />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            onSubmit={onSubmit}
            className={`text-white bg-primary px-4 py-2 rounded text-lg font-bold ${
              loading && "bg-primary/35 flex items-center gap-1"
            }`}
          >
            {loading ? "Saving" : "Save hotel"}
            {loading && <TbLoader2 className="size-5 animate-spin" />}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
export default ManageHotelForm;
