import HomeCarosal from "@/components/Carousel/HomeCarosal";
import TestominalCarosal from "@/components/Carousel/TestominalsCarosal";
import HeroParallax from "@/components/parallax/HeroParallex";
import Head from "next/head";


export default function Home() {
  return (
    <>
    
      <HomeCarosal/>
      <HeroParallax/>
      <TestominalCarosal/>
    </>
  );
}
