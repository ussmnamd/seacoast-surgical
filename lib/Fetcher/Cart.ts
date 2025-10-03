import axiosInstance from "@/config/axios";
import { getToken } from "@/lib/getToken";


interface CartItem {
  id: number;
  quantity: number;
  sku: string;
}
// Fetch All Carts Products
export const fetchCart = async () => {
  const token = getToken();

  if (token.length!==0) {
    try {
      const response = await axiosInstance.get("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch Cart Products");
      }
      return response.data.cart || [];
    } catch (error) {
      throw new Error("Failed to fetch Cart Products");
    }
  } else {
    // User is not logged in, fetch from local storage
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart;
  }
};
export const getLocalCartItems = async (localCartJSON: string) => {
  try {
    const localCart: CartItem[] = JSON.parse(localCartJSON);
    const token = getToken();

    localCart.map(async (item: CartItem, key = 0) => {});

    const promises = localCart.map(async (item: CartItem) => {
      try {
        await axiosInstance.post(
          "api/add-to-cart",
          {
            product_id: item.id,
            quantity: item.quantity,
            sku: item.sku,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error(
          `Error sending cart item with product_id ${item.id} to server:`,
          error
        );
      }
    });
    await Promise.all(promises);
    // Clear local cart after sending to server
    localStorage.removeItem("cart");
    console.log("Local cart cleared successfully.");
  } catch (error) {
    console.error(
      "Error parsing local cart JSON or sending items to server:",
      error
    );
  }
};
