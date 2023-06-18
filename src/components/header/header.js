import React from "react";
import { headingOne } from "../../utils/styles";

export const Header = () => {
  return (
    <div>
      <div style={headingOne}>
        {"Welcome to the CyBears project for CalHacks 2023!"}
      </div>

      <p>
        {"Get started by uploading an image or a video."}
      </p>
    </div>
  );
};
