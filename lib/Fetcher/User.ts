import axiosInstance from "@/config/axios";
import { getToken } from "../getToken";

// Fetch User
export const fetchLoggedUser = async () => {
  const token = getToken();
  
  if (token.length == 0) {
    return null;
  }
  try {
    const response = await axiosInstance.get("/api/get-client-by-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response || response.status !== 200) {
      throw new Error("Failed to fetch User");
    }
    
    return response.data.client ;
  } catch (error) {
    throw new Error("Failed to fetch User");
  }
};