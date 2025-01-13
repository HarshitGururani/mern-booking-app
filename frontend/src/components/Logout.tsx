import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as apiClient from "../api-client";
import { TbLoader2 } from "react-icons/tb";

const LogOut = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("Signed Out!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  const handleClick = () => {
    mutate();
  };
  return (
    <button
      className={`bg-primary py-2 px-4 font-semibold rounded-lg text-white ml-10 ${
        isLoading && "bg-primary/35 flex items-center gap-1"
      }`}
      onClick={handleClick}
    >
      Logout
      {isLoading && <TbLoader2 className="size-5 animate-spin" />}
    </button>
  );
};
export default LogOut;
