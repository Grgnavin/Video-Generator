import React from "react";

const LoadingScreen = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-300"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      {/* Spinner without outer circle */}
      <svg
        className="animate-spin h-12 w-10 text-gray-400 mb-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-label="Loading spinner"
      >
        <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>

      {/* Text */}
      <p className="text-lg font-semibold tracking-wide">Please wait</p>
    </div>
  );
};

export default LoadingScreen;
