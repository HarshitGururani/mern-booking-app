/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { HotelType } from "../../backend/src/shared/types";
import { LoginFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/register`,
      JSON.stringify(formData),
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const validateToken = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/auth/validate-token`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const Login = async (formData: LoginFormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    if (response.status !== 200) {
      throw new Error("Error during sign out");
    }
  } catch (error: any) {
    const errorMessage = error?.response.data?.message || "Error during Logout";
    throw new Error(errorMessage);
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/my-hotels`,
    hotelFormData,
    {
      withCredentials: true,
    }
  );
  if (response.status !== 201) {
    throw new Error("Failed to add hotel");
  }

  return response.data;
};

export const myHotels = async (): Promise<HotelType[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/my-hotels`, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Error during fetching hotels");
  }

  return response.data;
};
