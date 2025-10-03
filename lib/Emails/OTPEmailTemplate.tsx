import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";
export const OTPEmailTemplate = ({
  otp,

  CompanyName,
}: {
  CompanyName: string;
  otp: number;
}) => (
  <Html>
    <Head />
    <Preview>Account Deactivation Notice </Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Dear User,</Text>
        <Text style={paragraph}>
          Thank you for initiating the verification process. To proceed further,
          please use the following One-Time Password.
        </Text>
        <Text style={paragraph}>OTP: {otp}.</Text>
        <Text style={paragraph}>
          Please note that this OTP is valid for 60 seconds from the time this
          email was sent. Kindly ensure to complete the verification within this
          time frame.
        </Text>
        <Text style={paragraph}>
          For security purposes, please refrain from sharing this OTP with
          anyone. If you didnt initiate this action, please disregard this
          email.
        </Text>
        <Text style={paragraph}>
          Should you encounter any issues or require assistance, feel free to
          reach out to our support team.
        </Text>
        <Text style={paragraph}>Regards,</Text>
        <Text style={paragraph}>The Team at {CompanyName}</Text>
      </Container>
    </Body>
  </Html>
);

export default OTPEmailTemplate;
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
