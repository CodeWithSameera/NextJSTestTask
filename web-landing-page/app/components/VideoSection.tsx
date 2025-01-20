'use client';

import React, { useState, useRef, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logEvent } from '@/app/utils/analytics';


const VideoSection = () => {
  
    const videoRef = useRef<HTMLVideoElement>(null);
    const [progress, setProgress] = useState(0);
    const [activeCard, setActiveCard] = useState<string | null>(null);

    const timestamps = [
        { time: 5, label: 'Static top drill',discription:'Get a feel for the optimal wrist position at Top of your swing' },
        { time: 14, label: 'Dynamic top drill',discription:'Dynamically train your wrist position at Top' },
        { time: 24, label: 'Top full swing challenge',discription:'Train your maximum power swing'},
    ];

    const handleVideoEnd = () => {
      logEvent('full_video_watch', {
        userId:'user123', 
        videoUrl: videoRef.current?.src,
        browserInfo: navigator.userAgent,
        deviceInfo: navigator.platform,
      });
    };

    const handleVideoProgress = () => {
        if (!videoRef.current) return;

        const progressPercentage =
            (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(progressPercentage);

        const currentTime = videoRef.current.currentTime;
        const active = timestamps.find((t) => currentTime >= t.time - 1 && currentTime < t.time + 5);
        setActiveCard(active ? active.label : null);
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.addEventListener('timeupdate', handleVideoProgress);

        return () => {
            video.removeEventListener('timeupdate', handleVideoProgress);
        };
    }, []);

    return (
      <section className="py-10 px-5 md:px-40 bg-gray-100">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="h-[224.24px] md:w-2/3 sm:w-full md:h-[510px]">
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              controls
              onEnded={handleVideoEnd}
              src="/videos/video.mp4"
            ></video>
          </div>

          <div className="lg:flex lg:flex-row md:flex-col sm:flex-col items-start lg:gap-5 md:gap-2 md:w-1/3 sm:w-full">
            <ProgressBar progress={progress} />

            <div className="space-y-4 flex-1">
              {timestamps.map((timestamp) => (
                <div key={timestamp.label} className={`p-2 duration-200 `}>
                  <div className="flex items-center justify-start gap-x-3 px-4 py-2 font-semibold text-[#5773ff]">
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`transition-transform transform ${
                        activeCard === timestamp.label ? "rotate-180" : ""
                      }`}
                    />
                    <span>{timestamp.label}</span>
                  </div>
                  <div className="text-black text-xl font-normal font-['IBM Plex Sans'] leading-[30px] px-3">
                    {activeCard === timestamp.label
                      ? timestamp.discription
                      : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
};

export default VideoSection;
