import { useEffect, useState } from "react";

interface ProgressBarProps {
    progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
      // Check if `window` is defined (runs only on the client side)
      if (typeof window !== "undefined") {
        const handleResize = () => {
          setIsLargeScreen(window.innerWidth >= 768);
        };
  
        // Set initial state
        handleResize();
  
        // Add event listener
        window.addEventListener("resize", handleResize);
  
        // Clean up event listener
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []);
    return (

        isLargeScreen?
        <div className="relative bg-white rounded-full justify-center items-start p-2 flex w-2 h-full">
            <div
                className="absolute flex w-2 h-fit bg-blue-500 rounded"
                style={{ height: `${progress-2}%` }}
            ></div>
        </div>
        :
        <div className="relative bg-white rounded-full justify-start items-start p-2 flex w-full h-2">
        <div
            className="absolute flex w-fit h-2 bg-blue-500 rounded"
             style={{ width: `${progress-2}%` }}
           
        ></div>
    </div>
    );
};

export default ProgressBar;
