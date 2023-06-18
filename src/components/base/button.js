import React, { useState, useEffect } from "react";
import { bluePalette, darkBluePalette, defaultSpacing, buttonText } from "../../utils/styles";
import { Color, interpolateColor } from "../../utils/Colors";

export const Button = (props) => {
  const [hovering, setHovering] = useState(false);
  const [borderValue, setBorderValue] = useState(false);
  const [dropShadowOpacity, setDropShadowOpacity] = useState(0.2);
  const [yOffset, setYOffset] = useState(0);

  const decayFactor = 0.85;

  useEffect(() => {
    function refresh() {
      if (hovering) {
        setBorderValue(borderValue + (1 - decayFactor) * (1 - borderValue));
        setDropShadowOpacity(dropShadowOpacity + (1 - decayFactor) * (0.7 - dropShadowOpacity))
      } else {
        setBorderValue(borderValue * decayFactor);
        setDropShadowOpacity(dropShadowOpacity + (1 - decayFactor) * (0.4 - dropShadowOpacity))
      }
      setYOffset(yOffset * decayFactor);

    }
    const timerId = setInterval(refresh, 10);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, [borderValue]);

  const clickHandler = (e) => {
    props.clickHandler();
    setBorderValue(3);
    setYOffset(6);
  };

  const onMouseEnterHandler = (e) => {
    setBorderValue(borderValue + 0.001);
    setHovering(true);
  };

  const onMouseLeaveHandler = (e) => {
    setHovering(false);
  };

  const defaultButton = {
    backgroundImage:
      "linear-gradient(180deg, " + darkBluePalette[4].getHex() + " " +
      "0%, " +
      interpolateColor(
        darkBluePalette[1],
        darkBluePalette[0],
        1 - dropShadowOpacity / 2,
      ).getHex() + 
      " 100%)",
    boxShadow:
      "10px 10px 20px rgba(" +
      bluePalette[0].red +
      ", " +
      bluePalette[0].green +
      ", " +
      bluePalette[0].blue +
      ", " +
      dropShadowOpacity +
      ")",
    borderStyle: "solid",
    borderRadius: "10px",
    borderWidth: "1px",
    margin: "10px",
    marginTop: 10 + yOffset,
    marginBottom: 10 - yOffset,
    paddingTop: 10,
    paddingBottom: 10,

    verticalAlign: "center",

    borderColor: bluePalette[3].getHex(),
  };

  const i = Math.floor(borderValue);
  const t = borderValue % 1;
  const borderColor = interpolateColor(
    bluePalette[Math.max(0, 2 - i)],
    darkBluePalette[i],
    t
  );

  return (
    <div
      style={{
        ...defaultButton,
        width: props.width,
        height: props.height,
        borderColor: borderColor.getHex(),
      }}
      onMouseDown={clickHandler}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div style={defaultSpacing}>
        <div style={buttonText}>
            {props.children}
        </div>
      </div>
    </div>
  );
};
