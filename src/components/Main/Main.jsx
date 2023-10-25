import React from "react";
import Chat from "./Chat/Chat";
import Radio from "./Radio/Radio";
import Slider from "./Slider/Slider";
import BackgroundVideo from "../../assets/background-360p.mp4";

const Main = () => {
  return (
    <main className="bg-gray-900 text-white h-screen flex flex-col relative overflow-hidden text-center">
      <video
        playsInline
        autoPlay
        muted
        loop
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
      >
        <source src={BackgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="pt-16 pb-24 p-4 h-full mx-auto grow flex flex-col md:flex-row relative z-30 items-center gap-2 container">
        <Slider />
        <Chat />
      </div>
    </main>
  );
};

export default Main;
