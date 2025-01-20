"use client"; 
import Image from "next/image";
import { Suspense } from 'react';
import { useRouter ,useSearchParams} from "next/navigation";
import { useEffect } from "react";
import { logEvent } from '@/app/utils/analytics';
import Footer from "./components/Footer";

const  LandingPage=()=>{
    const searchParams = useSearchParams();

    const goal = searchParams?.get("goal") || "Break 80";

    const router = useRouter();

    const handleStartNow = () => {
      router.push("/get-started");
    };

    useEffect(() => {
      logEvent("page_view", {
        userId: "user123",
        pageUrl: window.location.href,
        browserInfo: navigator.userAgent,
        deviceInfo: navigator.platform,
      });
    }, []);

  return (
    <div className="w-full min-h-screen bg-gray-200 p-8 flex flex-col items-center justify-center">
      <div className="absolute top-5 left-5">
        <Image
          src="/images/Logo (2).png"
          alt="Logo"
          width={213}
          height={32}
          priority
        />
      </div>
      <div className="flex flex-col container md:flex-row gap-8 max-w-7xl pt-6 md:pt-0">
        <div className="flex-1 h-full self-center">
          <div className="flex-1 space-y-6">
            <div className="max-w-4xl text-leftmb-8 h-1/2">
              <div className="text-2xl font-medium text-gray-800">
                We have put together a swing improvement solution to help you{" "}
                <span className="text-blue-600">{goal}</span>
              </div>
            </div>
            <div className="h-1/2 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Pack includes:
              </h2>
              <ul className="border-l-4 border-blue-500 pl-4 space-y-3 text-lg">
                <li>Swing Analyzer - HackMotion Core</li>
                <li>Drills by coach Tyler Ferrell</li>
                <li>Game improvement plan by HackMotion</li>
              </ul>
              <button className="bg-blue-500 text-white py-3 px-6 rounded-full font-medium" onClick={handleStartNow}>
                Start Now
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="bg-white p-4 rounded-2xl flex flex-col items-center">
            <div className="flex-1 w-full justify-self-center">
              <Image
                src="/images/Improvement Graph.png"
                alt="graph"
                width={566}
                height={439}
                priority
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="space-y-4 mt-4">
              <Image
                src="/images/Frame 4151179.png"
                alt="improvement"
                width={566}
                height={274}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Home = () => (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingPage />
      <Footer/>
    </Suspense>
);
  
export default Home;