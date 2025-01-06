import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { toast } from "react-toastify";

const SingOutButton = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.signout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("Signed out successfully");
    },
    onError(error: Error) {
      console.log(error);
      toast.error(error.message);
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      className="text-blue-600 px-3 py-1 font-bold bg-white hover:bg-gray-100 transition-colors rounded
    "
      onClick={handleClick}
    >
      Sign out
    </button>
  );
};
export default SingOutButton;
