import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as apiClient from "../api-client";
import registerImage from "../assets/register-image.png";
import { TbLoader2 } from "react-icons/tb";
export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<RegisterFormData>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(apiClient.register, {
    onSuccess: async () => {
      toast.success("Registration Success!");
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <div className="block md:flex justify-center items-center mt-10 md:mt-8 border border-border md:border-none mb-16 ">
      <div className="flex max-w-4xl  bg-white rounded-lg shadow-md">
        <div className="hidden w-[60%] md:flex justify-center py-14 pr-0 border border-slate-300 rounded shadow-md flex-1">
          <img src={registerImage} alt="" className="object-contain" />
        </div>

        <div className="flex-1">
          <h1 className="text-center text-4xl font-bold mt-3">Register</h1>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col mt-10 px-8 gap-6">
              <div className="flex gap-4">
                <label className="text-gray-700 text-sm font-bold">
                  First Name
                  <input
                    type="text"
                    {...register("firstName", {
                      required: "This field is required",
                    })}
                    className="w-full py-2 px-3 font-normal border rounded"
                  />
                  {errors.firstName && (
                    <p className="font-bold text-sm text-destructive">
                      {errors.firstName.message}
                    </p>
                  )}
                </label>
                <label className="text-gray-700 text-sm font-bold">
                  Last Name
                  <input
                    type="text"
                    {...register("lastName", {
                      required: "This field is required",
                    })}
                    className="w-full py-2 px-3 font-normal border rounded"
                  />
                  {errors.lastName && (
                    <p className="font-bold text-sm text-destructive">
                      {errors.lastName.message}
                    </p>
                  )}
                </label>
              </div>

              <label className="text-gray-700 text-sm font-bold">
                Email
                <input
                  type="email"
                  {...register("email", {
                    required: "This field is required",
                  })}
                  className="w-full py-2 px-3  font-normal border rounded"
                />
                {errors.email && (
                  <p className="font-bold text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </label>

              <label className="text-gray-700 text-sm font-bold">
                Password
                <input
                  type="password"
                  {...register("password", {
                    required: "This field is required",
                  })}
                  className="w-full py-2 px-3  font-normal border rounded"
                />
                {errors.password && (
                  <p className="font-bold text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </label>
              <label className="text-gray-700 text-sm font-bold">
                Confirm Password
                <input
                  type="password"
                  {...register("confirmPassword", {
                    validate: (val) => {
                      if (!val) {
                        return "This field is required";
                      } else if (watch("password") !== val) {
                        return "Your passwords do not match";
                      }
                    },
                  })}
                  className="w-full py-2 px-3  font-normal border rounded"
                />
                {errors.confirmPassword && (
                  <p className="font-bold text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </label>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to={"/login"} className="text-primary underline">
                    Sign in
                  </Link>
                </span>
                <button
                  className={`bg-primary text-white px-4 py-2 rounded text-base font-bold mb-4 md:mb-0 ${
                    isLoading && "bg-primary/35 flex items-center gap-1"
                  }`}
                  type="submit"
                >
                  {isLoading ? "Creating Account" : "Create Account"}
                  {isLoading && <TbLoader2 className="size-5 animate-spin" />}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
