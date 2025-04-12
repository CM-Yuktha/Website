"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation.tsx";

export function HeroScrollDemo() {
  return (
    <div style={{ 
      position: 'relative', // Add this
      width: '100%',
      height: '100vh', // Ensure full viewport height
      overflow: 'hidden' // Only if needed
    }}>
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                <span
                  className={`text-orange-300 font-extrabold `}
                >
                  Create
                </span>{" "}
                <span
                  className={`text-orange-500 font-extrabold `}
                >
                  My
                </span>{" "}
                <span
                  className={`text-red-500 font-extrabold `}
                >
                  API
                </span>
              </span>
            </h1>
          </>
        }
      >
        <video // <-- Make sure your video file is in the /public folder
        autoPlay
        loop
        muted
        playsInline
        className="mx-auto rounded-2xl object-cover h-full object-left-top"
        >
          <source src="/v1.mp4" type="video/mp4" />
          </video>
      </ContainerScroll>
    </div>
  );
}
