import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-option-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="font-bold text-2xl text-secondary-foreground mb-4">
        Facilities
      </h2>

      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility, id) => (
          <label key={id} className="flex gap-2 items-center">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            <span className="text-sm">{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <p className="text-sm text-destructive">{errors.facilities.message}</p>
      )}
    </div>
  );
};
export default FacilitiesSection;
