import axiosInstance from "@/config/axios";
import { getToken } from "../getToken";

// Fetch Sended Inquiries from the user
export const SendedInquiries = async () => {
    const token = getToken();
    
    try {
      const response = await axiosInstance.get(
        `/api/client-queries`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch QRF");
      }
      
      return response.data.client_qrfs || [];
      // return [];
    } catch (error) {
      throw new Error("Failed to fetch QRF");
    }
};
