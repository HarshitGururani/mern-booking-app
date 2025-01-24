/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { HotelSearchResponse, HotelType } from "../../backend/src/shared/types";
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

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await axios.get(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Error during fetching hotel detail");
  }

  return response.data;
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    hotelFormData,
    { withCredentials: true }
  );

  if (response.status !== 201) {
    throw new Error("Failed to update Hotel");
  }

  return response.data;
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  SearchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();

  queryParams.append("destination", SearchParams.destination || "");
  queryParams.append("checkIn", SearchParams.checkIn || "");
  queryParams.append("checkOut", SearchParams.checkOut || "");
  queryParams.append("adultCount", SearchParams.adultCount || "");
  queryParams.append("childCount", SearchParams.childCount || "");
  queryParams.append("page", SearchParams.page || "");

  queryParams.append("maxPrice", SearchParams.maxPrice || "");
  queryParams.append("sortOption", SearchParams.sortOption || "");

  SearchParams.facilities?.map((facility) =>
    queryParams.append("facilities", facility)
  );

  SearchParams.types?.forEach((type) => queryParams.append("types", type));

  SearchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await axios.get(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );

  if (response.status !== 200) {
    throw new Error("Error fetching hotels");
  }

  return response.data;
};
