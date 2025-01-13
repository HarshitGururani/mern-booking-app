import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-option-config";
import { HotelFormData } from "./ManageHotelForm";

const HotelType = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");
  return (
    <div>
      <h2 className="font-bold text-2xl text-secondary-foreground mb-3">
        Type
      </h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type, id) => (
          <label
            key={id}
            className={
              typeWatch === type
                ? "cursor-pointer bg-primary text-sm rounded-full px-4 py-2 font-semibold text-white"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              type="radio"
              value={type}
              className="hidden"
              {...register("type", {
                required: "Hotel type is required",
              })}
            />
            <span className="">{type}</span>

            {errors.type && (
              <span className="text-destructive text-sm font-bold">
                {errors.type.message}
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};
export default HotelType;
