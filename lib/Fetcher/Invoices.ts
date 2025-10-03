import axiosInstance from "@/config/axios";
import { getToken } from "../getToken";

// Fetch Invoices
export const fetchMyInvoices = async () => {
    const token = getToken();
    try {
      const response = await axiosInstance.get(`/api/client-invoices`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response || response.status !== 200) {
        throw new Error("Failed to fetch invoices");
      }
       return response.data.client_invoices || [] ;
      // return [];
    } catch (error) {
      throw new Error("Failed to fetch invoices");
    }
  };

// Fetch Pending approval Invoices
export const fetchMyPendingApprovalInvoices = async () => {
  const token = getToken();
  try {
    const response = await axiosInstance.get(`/api/get-pending-approval-invoices`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response || response.status !== 200) {
      throw new Error("Failed to fetch invoices");
    }
    
    return response.data.client_invoices || [] ;
    // return [];
  } catch (error) {
    throw new Error("Failed to fetch invoices");
  }
};

// Fetch Paid and ending approval Invoices
export const fetchMyPaidAndPendingApprovalInvoices = async () => {
  const token = getToken();
  try {
    const response = await axiosInstance.get(`/api/get-pending-approval-and-paid-invoices`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response || response.status !== 200) {
      throw new Error("Failed to fetch invoices");
    }
    
    return response.data.client_invoices || [] ;
    // return [];
  } catch (error) {
    throw new Error("Failed to fetch invoices");
  }
};
