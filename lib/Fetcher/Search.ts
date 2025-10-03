import axiosInstance from "@/config/axios";

export const fetchSearchProducts = async (query: string) => {
  try {
    const response = await axiosInstance.post(`/api/search-products`, {
      search: query,
    });

    if (!response || response.status !== 200) {
      throw new Error("Failed to fetch Search Products");
    }

    return response.data.products || [];
  } catch (error) {
    throw new Error("Failed to fetch Search Products");
  }
};
