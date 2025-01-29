import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../../context/SearchContext";
import { useAppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";

type props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/login", {
      state: { from: { pathname: location.pathname, search: location.search } },
    });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-orange-200 gap-4 rounded">
      <h3 className="text-md font-bold">₹{pricePerNight}</h3>

      <form
        className="grid grid-cols-1 gap-4 items-center"
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div>
          <DatePicker
            required
            selected={checkIn}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(date) => setValue("checkIn", date as Date)}
            placeholderText="Check in date"
            className="w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />
        </div>

        <div>
          <DatePicker
            required
            selected={checkOut}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(date) => setValue("checkOut", date as Date)}
            placeholderText="Check out date"
            className="w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />
        </div>

        <div className="flex bg-white px-2 py-1 gap-2 rounded-sm">
          <label className="flex items-center text-sm md:text-base">
            Adults:
            <input
              className="w-full p-1 focus:outline-none font-bold"
              type="number"
              min={1}
              max={20}
              {...register("adultCount", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "There must be at least one adult",
                },
                valueAsNumber: true,
              })}
            />
          </label>

          <label className="flex items-center">
            Children:
            <input
              className="w-full p-1 focus:outline-none font-bold"
              type="number"
              min={0}
              max={20}
              {...register("childCount", {
                valueAsNumber: true,
              })}
            />
          </label>

          {errors.adultCount && (
            <span className="text-destructive font-semibold text-sm">
              {errors.adultCount.message}
            </span>
          )}
        </div>
        {isLoggedIn ? (
          <button className="bg-primary text-white h-full p-2 font-bold rounded text-lg">
            Book Now
          </button>
        ) : (
          <button className="bg-primary text-white h-full p-2 font-bold rounded text-lg text-center">
            Sign in to book
          </button>
        )}
      </form>
    </div>
  );
};
export default GuestInfoForm;
