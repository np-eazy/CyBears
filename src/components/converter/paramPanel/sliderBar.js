import React from "react";
import { useState } from "react";
import { defaultSpacing } from "../../../utils/styles";

export const SliderBar = (props) => {
  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div style={defaultSpacing}></div>
        <label htmlFor="attribute1" className="mr-2">
          {props.valueName}
        </label>

        <div style={defaultSpacing}>
          <input
            type="number"
            id="attribute1"
            className="w-16 text-center"
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
            className="flex-grow ml-4"
            style={{
              maxWidth: 100,
            }}
          />
        </div>

        <div style={defaultSpacing}>
        </div>
      </div>
    </div>
  );
};
