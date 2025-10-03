import { render } from "@react-email/render";
import WelcomeEmailTemplate from "./WelcomeEmailTemplate";
import UserInfoTemplate from "./UserInfoTemplate";

export const sendFreshUserInfo = (userFirstname:string,userEmail:string,recipientType : string) => {
    console.log(userFirstname,userEmail)
  return render(
    UserInfoTemplate(
      {userFirstname, userEmail , recipientType}
     )
  );
};
