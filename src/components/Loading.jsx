import React from "react";

const Loading = () => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center bg-white">
      <div className="relative w-[120px] h-[120px]">
        <div className="absolute inset-0 bg-orange-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>

        {/* Main Bouncing Paw/Ball */}
        <div
          className="absolute bottom-0 left-[40px] h-[40px] w-[40px] rounded-full bg-gradient-to-tr from-orange-500 via-pink-500 to-red-500 shadow-[0_10px_20px_rgba(249,115,22,0.4)] z-10"
          style={{
            animation:
              "premium-bounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite alternate",
          }}
        >
          <div className="absolute top-2 left-2 w-3 h-3 bg-white/30 rounded-full"></div>
        </div>

        <div
          className="absolute bottom-[-10px] left-[45px] w-[30px] h-[5px] bg-gray-200 rounded-full blur-sm"
          style={{
            animation: "shadow-scale 0.6s ease-in-out infinite alternate",
          }}
        ></div>

        <div
          className="absolute right-0 top-0 h-[8px] w-[50px] rounded-full"
          style={{
            boxShadow:
              "0 5px 0 #fb923c, -40px 45px 0 #f472b6, -80px 85px 0 #fb923c",
            animation: "step-slide 1.2s linear infinite",
          }}
        />
      </div>

      <div className="mt-12 text-center">
        <p className="text-2xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent uppercase tracking-[0.3em] animate-pulse">
          Loading
        </p>
        <div className="flex justify-center gap-1 mt-1">
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></span>
        </div>
      </div>

      <style>
        {`
          @keyframes premium-bounce {
            0% { 
              transform: translateY(0) scale(1.2, 0.8); 
            }
            100% { 
              transform: translateY(-80px) scale(1, 1); 
            }
          }

          @keyframes shadow-scale {
            0% { transform: scale(1.5); opacity: 0.4; }
            100% { transform: scale(0.5); opacity: 0.1; }
          }
          
          @keyframes step-slide {
            0% {
              transform: translateX(0);
              opacity: 0.5;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateX(-20px);
              opacity: 0.5;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
