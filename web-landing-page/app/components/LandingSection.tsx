

import Image from "next/image";
import { useEffect } from "react";
import { logEvent } from '@/app/utils/analytics';
interface LandingPageProps {
  goal: string;
}

const LandingPage = ({ goal }: LandingPageProps) => {
  useEffect(() => {
    logEvent("page_view", {
      userId: "user123",
      pageUrl: window.location.href,
      browserInfo: navigator.userAgent,
      deviceInfo: navigator.platform,
    });
  }, []);

  const handleStartNow = () => {
    console.log("HandleButtonClick");
  };

  return (
    <div className="w-full bg-gray-200 p-4 flex flex-col items-center justify-center">
      <div className="flex justify-start items-center w-full">
        <Image
          src="/images/Logo (2).png"
          alt="Logo"
          width={213}
          height={32}
          priority
        />
      </div>
      <div className="flex flex-col md:flex-row gap-8 pt-6 md:pt-0  w-full lg:px-32">
        <div className="flex-1 h-full self-center content-between">
          <div className="flex-1 space-y-6">
            <div className="max-w-4xl text-left h-1/2 ">
              <div className="text-2xl font-medium text-gray-800">
                We have put together a swing improvement solution to help you{" "}
                <span className="text-blue-600">{goal}</span>
              </div>
            </div>
            <div className="h-1/2 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Pack includes:
              </h2>
              <ul className="border-l-4 border-blue-500 pl-4 space-y-3 text-lg text-gray-800">
                <li>Swing Analyzer - HackMotion Core</li>
                <li>Drills by coach Tyler Ferrell</li>
                <li>Game improvement plan by HackMotion</li>
              </ul>
              <button
                className="bg-blue-500 text-white py-3 px-6 rounded-full font-medium"
                onClick={handleStartNow}
              >
                Start Now
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="bg-white p-4 rounded-2xl flex flex-col items-center">
            <div className="flex w-full justify-center">
              <Image
                src="/images/Improvement Graph.png"
                alt="graph"
                width={566}
                height={439}
                priority
              />
            </div>
          </div>
          <div className="flex lg:flex-row md:flex-col flex-col w-full">
            <div className="flex-1 lg:px-2 py-2">
              <Image
                src="/images/Improvement Progress bar.png"
                alt="improvement"
                layout="responsive"
                width={243}
                height={137}
                priority
              />
            </div>
            <div className="flex-1 lg:px-2 py-2">
              <Image
                src="/images/Frame 4151178.png"
                alt="improvement"
                layout="responsive"
                width={243}
                height={137}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;