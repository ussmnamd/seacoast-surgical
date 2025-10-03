import { getCookie } from "cookies-next";

export const getToken = (): string => {
  const token = getCookie("token");
  if (token) {
    return token;
  }
  return "";
};
