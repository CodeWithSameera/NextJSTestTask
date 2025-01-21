"use client"; 
import { Suspense } from 'react';
import Footer from "./components/Footer";
import VideoSection from "./components/VideoSection";
import TitleSection from "./components/TitleSection";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const LandingPage = dynamic(() => import('./components/LandingSection'), {
  ssr: false, 
});

const allowedGoals = ["Break Par", "Break 80", "Break 90", "Break 100"];

const PathValidation =()=>{
  const searchParams = useSearchParams();
  const goal = searchParams?.get("goal") || "Invalid"; 

  if (!allowedGoals.includes(goal)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-600 font-bold text-lg">
          Invalid goal provided. Please choose a valid goal.
        </div>
      </div>
    );
  }else{
    return (
      <>
      <LandingPage goal={goal} />
      <TitleSection />
      <VideoSection />
      </>
    )
  }
}

const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PathValidation/>
      <Footer />
    </Suspense>
  );
};

export default Home;
