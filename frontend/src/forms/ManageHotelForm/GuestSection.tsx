import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="font-bold text-secondary-foreground mb-4 text-2xl">
        Guests
      </h2>
      <div className="flex gap-4 p-5 bg-tint rounded">
        <label className="flex-1 text-white font-bold">
          Adults
          <input
            type="number"
            min={1}
            className="w-full py-2 px-3 font-normal border rounded text-black"
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount && (
            <p className="text-sm text-destructive">
              {errors.adultCount.message}
            </p>
          )}
        </label>
        <label className="flex-1 text-white font-bold">
          Children
          <input
            type="number"
            min={0}
            {...register("childCount", { required: "This field is required" })}
            className="w-full py-2 px-3 font-normal border rounded text-black"
          />
          {errors.childCount && (
            <p className="text-sm text-destructive">
              {errors.childCount.message}
            </p>
          )}
        </label>
      </div>
    </div>
  );
};
export default GuestSection;
