import React from "react";
import Radio from "../Main/Radio/Radio";

const Footer = () => {
  return (
    <footer className="text-white text-xs fixed bottom-0 w-full text-center backdrop-blur">
      <Radio />
      <p className="m-0">
        <small className="lh-1">
          &copy; 2023 <b className="fw-semibold lh-1">Pasión Choppers </b>|
          <em className="lh-1"> Argentina</em>
        </small>
      </p>
    </footer>
  );
};

export default Footer;
