import React from "react";
import { useState } from "react";
import { defaultSpacing, darkBluePalette } from "../../../utils/styles";
import { Panel } from "../../base/panel";

export const SliderBar = (props) => {
  return (
    <div className="p-4">
      <Panel height={100}>
            <div style={{
              color: darkBluePalette[1].getHex(),
            }}>
            {props.valueName}

            </div>

          <div style={defaultSpacing}>
            <input
              type="number"
              id="attribute1"
              value={props.value}
              onChange={props.handleValueChange}
              style={{
                maxWidth: 100,
              }}
            />
            <input
              type="range"
              min={props.minimum}
              max={props.maximum}
              value={props.value}
              onChange={props.handleValueChange}
              style={{
                maxWidth: 100,
              }}
            />
          </div>

          <div style={defaultSpacing}></div>
      </Panel>
    </div>
  );
};
