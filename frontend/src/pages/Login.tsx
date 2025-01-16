import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as apiClient from "../api-client";
import loginImage from "../assets/login-image.png";
import { TbLoader2 } from "react-icons/tb";

export interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(apiClient.Login, {
    onSuccess: async () => {
      toast.success("Login Successfull!");
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
    <div className="block md:flex justify-center items-center m-10 md:mt-8 border border-border md:border-none">
      <div className="flex max-w-4xl bg-white rounded-lg shadow-md">
        <div className="hidden w-[60%] md:flex justify-center py-10 pr-0 border border-slate-300 rounded shadow-md flex-1">
          <img src={loginImage} alt="" className="object-contain" />
        </div>

        <div className="flex-1">
          <h1 className="text-center text-4xl font-bold mt-3">Login</h1>
          <div className="flex flex-col mt-10 px-8 gap-6">
            <form onSubmit={onSubmit} className="flex flex-col space-y-6">
              <label className="text-gray-700 text-sm font-bold">
                Email
                <input
                  type="email"
                  {...register("email", {
                    required: "This field is required",
                  })}
                  className="w-full py-2 px-3 font-normal border rounded"
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
                  className="w-full py-2 px-3 font-normal border rounded"
                />
                {errors.password && (
                  <p className="font-bold text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </label>

              <div className="flex items-center justify-between my-6">
                <span className="text-sm text-gray-600">
                  Don&apos;t have an acoount?{" "}
                  <Link to={"/register"} className="text-primary underline">
                    register
                  </Link>
                </span>
                <button
                  className="bg-primary text-white px-5 py-2 rounded text-lg font-bold mb-4 md:mb-0 flex items-center gap-2"
                  type="submit"
                >
                  Login
                  {isLoading && <TbLoader2 className="size-5 animate-spin" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
