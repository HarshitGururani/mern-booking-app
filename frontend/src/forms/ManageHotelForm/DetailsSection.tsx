import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="">
      <h2 className="text-primary text-3xl font-bold mb-3">Add Hotel</h2>
      <label className="text-gray-700 text-base font-bold">
        Name
        <input
          type="text"
          className="w-full py-2 px-3 font-normal border rounded"
          {...register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && (
          <p className="text-destructive font-bold text-sm">
            {errors.name.message}
          </p>
        )}
      </label>

      <div className="flex gap-4 items-center">
        <label className="text-gray-700 text-base font-bold flex-1">
          City
          <input
            type="text"
            className="w-full py-2 px-3 font-normal border rounded"
            {...register("city", {
              required: "City is required",
            })}
          />
          {errors.city && (
            <p className="text-destructive font-bold text-sm ">
              {errors.city.message}
            </p>
          )}
        </label>
        <label className="text-gray-700 text-base font-bold flex-1">
          Country
          <input
            type="text"
            className="w-full py-2 px-3 font-normal border rounded"
            {...register("country", {
              required: "Country is required",
            })}
          />
          {errors.country && (
            <p className="text-destructive font-bold text-sm">
              {errors.country.message}
            </p>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-base font-bold flex-1">
        Description
        <textarea
          className="w-full py-2 px-3 font-normal border rounded resize-none"
          rows={8}
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && (
          <p className="text-destructive font-bold text-sm ">
            {errors.description.message}
          </p>
        )}
      </label>

      <label className="text-gray-700 text-base font-bold flex-1 max-w-[50%]">
        Price per night
        <input
          type="number"
          min={1}
          className="w-full py-2 px-3 font-normal border rounded"
          {...register("pricePerNight", {
            required: "Price is required",
          })}
        />
        {errors.pricePerNight && (
          <p className="text-destructive font-bold text-sm">
            {errors.pricePerNight.message}
          </p>
        )}
      </label>

      <label className="text-gray-700 text-base font-bold flex-1 max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", {
            required: "Star rating is required",
          })}
          className="w-full border rounded py-2 px-3 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <p className="text-destructive font-bold text-sm">
            {errors.starRating.message}
          </p>
        )}
      </label>
    </div>
  );
};
export default DetailsSection;
