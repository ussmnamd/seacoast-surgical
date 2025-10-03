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
} from "@react-email/components";
import * as React from "react";
interface WelcomeEmailTemplateProps {
  userFirstname: string;
 
}


export const WelcomeEmailTemplate = ({
  userFirstname 

}: WelcomeEmailTemplateProps) => (
  <div className="">
    <Html>
      <Head />
     
      <Body style={main}>
        <Container style={container}>
          <Text style={paragraph}>Hi {userFirstname},</Text>
          <p style={paragraph}>
            You are now officially part of Dynamic Medical Solutions! We are
            stoked to have you on this cutting-edge journey to reshape the world
            of surgical and medical innovations. Thanks for jumping in and get
            ready for a future where top-notch healthcare is at your fingertips.
          </p>
          <Section style={btnContainer}>
            <Button 
              className="bg-blue-600 border-4 border-blue-600 rounded-md text-white p-4"
              href="https://gryphonmedicalsolutions.com/"
            >
              Get started
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            The Dynamic team
          </Text>
          <Hr style={hr} />
          <div className="-mt-4" ></div>
          <Text
          className=""
          style={footer}>
            1135 3rd Ave SW Carmel, IN 46032 USA
          </Text>
        </Container>
      </Body>
      
    </Html>
    </div>
);

export default WelcomeEmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
  padding: "20px"
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
