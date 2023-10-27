import React from "react";
import { useState, useRef } from "react";
import {
  PlayIcon,
  PauseIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import Logo from "../../../assets/escuchame-entre-el-ruido.png";

const Radio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef();
  const radioSrc = "http://stream.codigosur.org:8000/kasandrxs.mp3";
  /* "https://buecrplb01.cienradios.com.ar/1406_Rock_Argentino_32000.aac"; */

  const handleTogglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    !prevValue ? audioPlayer.current.play() : audioPlayer.current.pause();
  };

  const handleForward = () => {
    audioPlayer.current.currentTime = audioPlayer.current.currentTime + 15;
  };

  const handleBackward = () => {
    audioPlayer.current.currentTime = audioPlayer.current.currentTime - 15;
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3">
      <div className="flex items-center justify-center">
        <div className="bg-gray-900">
          <img
            className="h-14 w-auto object-contain"
            src={Logo}
            alt="Escuchame Entre El Ruido"
          ></img>
        </div>
        <div className="grow text-start ps-2">
          <div className="tracking-wide text-xs text-gray-400 font-semibold flex items-center flex gap-2">
            {isPlaying && (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-400"></span>
                </span>
                <p>esta sonando..</p>
              </>
            )}
          </div>
          <a
            href="http://escuchameentreelruido.ar"
            className="block mt-1 text-xs leading-tight font-medium text-white hover:underline mt-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Escuchame Entre El Ruido
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <audio ref={audioPlayer} src={radioSrc}></audio>
        <ChevronDoubleLeftIcon
          className="block h-3 w-6 transition ease-in-out hover:scale-125 active:-translate-x-1 cursor-pointer"
          aria-hidden="true"
          onClick={handleBackward}
        />
        <div
          className="p-1.5 mx-1 border-white border-2 hover:border rounded-full transition ease-in-out hover:scale-125 active:scale-100 cursor-pointer"
          onClick={handleTogglePlayPause}
        >
          {isPlaying ? (
            <PauseIcon className="block h-5 w-5 " aria-hidden="true" />
          ) : (
            <PlayIcon className="block h-5 w-5 " aria-hidden="true" />
          )}
        </div>
        <ChevronDoubleRightIcon
          className="block h-3 w-6 transition ease-in-out hover:scale-125 active:translate-x-1 cursor-pointer"
          aria-hidden="true"
          onClick={handleForward}
        />
      </div>
      <div></div>
    </div>
  );
};

export default Radio;
