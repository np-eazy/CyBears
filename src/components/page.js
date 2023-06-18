import React from "react";
import { Converter } from "./converter/converter";
import { Header } from "./header/header";
import { bluePalette } from "../utils/styles";

const overlayStyle = {
    position: "fixed", /* Sit on top of the page content */
    width: "100%", /* Full width (cover the whole page) */
    height: "100%", /* Full height (cover the whole page) */
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: "bg-base.jpg", /* Black background with opacity */
    zIndex: 2, /* Specify a stack order in case you're using a different order for other elements */    
}

export const Page = () => {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(180deg, #ffffff " +
          "0%, " +
          bluePalette[4].getHex() +
          " 25%, " +
          bluePalette[3].getHex() +
          " 50%, " +
          bluePalette[2].getHex() +
          " 75%, " +
          bluePalette[1].getHex() +
          " 100%)",
        minHeight: "1000px",
      }}
    >
      <Header />
      <Converter />
      {/* <div style={overlayStyle}></div> */}
    </div>
  );
};
