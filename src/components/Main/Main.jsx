import React from "react";
import Chat from "./Chat/Chat";
import Radio from "./Radio/Radio";
import Slider from "./Slider/Slider";
import BackgroundVideo from "../../assets/background-360p.mp4";

const Main = () => {
  return (
    <main className="bg-gray-900 text-white h-screen flex flex-col relative overflow-hidden text-center">
      <video playsInline autoPlay muted loop poster="cake.jpg">
        <source src={BackgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="pt-16 container mx-auto grow flex flex-col md:flex-row gap-2 relative">
        <Slider />
        <Chat />
      </div>
      <div className="pb-3 relative">
        <Radio />
      </div>
    </main>
  );
};

export default Main;
