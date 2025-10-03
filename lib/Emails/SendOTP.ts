import { render } from "@react-email/render";
import OTPEmailTemplate from "./OTPEmailTemplate";

export const SendOTPEmail = ({ otp }: { otp: number }) => {
  return render(
    OTPEmailTemplate({
      otp,
      CompanyName: "Dynamic Medical Solutions",
    })
  );
};
