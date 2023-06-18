import React, { useState, useEffect } from "react";
import { bluePalette, defaultSpacing, paragraph } from "../../utils/styles";
import { interpolateColor } from "../../utils/Colors";

export const Panel = (props) => {
  const [hovering, setHovering] = useState(false);
  const [borderValue, setBorderValue] = useState(false);
  const [dropShadowOpacity, setDropShadowOpacity] = useState(0);
  const decayFactor = 0.8;

  useEffect(() => {
    function refresh() {
      if (hovering) {
        setBorderValue(borderValue + (1 - decayFactor) * (1 - borderValue));
        setDropShadowOpacity(dropShadowOpacity + (1 - decayFactor) * (0.5 - dropShadowOpacity))
      } else {
        setBorderValue(borderValue * decayFactor);
        setDropShadowOpacity(dropShadowOpacity * decayFactor)
      }
    }
    const timerId = setInterval(refresh, 10);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, [borderValue]);

  const clickHandler = (e) => {
    setBorderValue(3);
  };

  const onMouseEnterHandler = (e) => {
    setHovering(true);
  };

  const onMouseLeaveHandler = (e) => {
    setHovering(false);
  };

  const defaultPanel = {
    backgroundImage:
      "linear-gradient(180deg, #ffffff " +
      "0%, " +
      bluePalette[4].getHex() +
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
    borderColor: bluePalette[3].getHex(),
  };

  const i = Math.floor(borderValue);
  const t = borderValue % 1;
  const borderColor = interpolateColor(
    bluePalette[4 - i],
    bluePalette[3 - i],
    t
  );

  return (
    <div
      style={{
        ...defaultPanel,
        width: props.width,
        height: props.height,
        borderColor: borderColor.getHex(),
      }}
      onMouseDown={clickHandler}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div style={defaultSpacing}>
        <div style={paragraph}>{props.message}</div>
      </div>
      <div style={defaultSpacing}>{props.children}</div>
    </div>
  );
};