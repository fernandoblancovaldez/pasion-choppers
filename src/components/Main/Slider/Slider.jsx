import React from "react";
import { Carousel } from "@material-tailwind/react";
import Ph1 from "../../../assets/fotos-slider/ph1.jpg";
import Ph2 from "../../../assets/fotos-slider/ph2.jpg";
import Ph3 from "../../../assets/fotos-slider/ph3.png";
import Ph4 from "../../../assets/fotos-slider/ph4.jpg";
import Ph5 from "../../../assets/fotos-slider/ph5.svg";

const Slider = () => {
  const images = [Ph1, Ph2, Ph3, Ph4, Ph5];
  console.log(images);
  return (
    <div className="h-1/2 md:w-3/5 md:h-5/6">
      <Carousel autoplay={true} loop={true}>
        {images.map((img, index) => {
          return (
            <img
              key={index}
              src={img}
              alt={`Ph${index}`}
              className="h-full w-full object-contain"
            />
          );
        })}
      </Carousel>
    </div>
  );
};

export default Slider;
