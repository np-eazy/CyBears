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
    mixBlendMode: "color-dodge",
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
    zIndex: -2, /* Specify a stack order in case you're using a different order for other elements */    
}

export const Page = () => {
  return (
    <div
      style={{
        
        minHeight: "1000px",
      }}
    >
      <div style={{
        minHeight: 200,
      }}>
      </div>
      <Header />
      <div style={{
        minHeight: 50,
      }}>
      </div>
      <Converter />
      <div style={overlayStyle}>
        <img style={overlayStyle} src="bg-base.png"></img>
      </div>
    </div>
  );
};
