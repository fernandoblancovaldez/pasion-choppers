import React from "react";
import { AuthProvider } from "../../context/AuthContext";
import Chat from "./Chat/Chat";
import Slider from "./Slider/Slider";
import BgImg from "../../assets/bg-img.jpg";

const Main = () => {
  return (
    <main
      className="bg-gray-900 text-white h-screen flex flex-col  overflow-hidden text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      <div className="pt-16 pb-24 p-4 h-full mx-auto grow flex flex-col md:flex-row items-center gap-2 container">
        <Slider />
        <AuthProvider>
          <Chat />
        </AuthProvider>
      </div>
    </main>
  );
};

export default Main;
