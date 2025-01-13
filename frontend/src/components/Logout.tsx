import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as apiClient from "../api-client";

const LogOut = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("Signed Out!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      className="bg-primary py-2 px-4 font-semibold rounded-lg text-white ml-10"
      onClick={handleClick}
    >
      Logout
    </button>
  );
};
export default LogOut;
