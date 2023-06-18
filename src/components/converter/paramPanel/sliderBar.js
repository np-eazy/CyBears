import React from "react";
import { useState } from "react";

export const SliderBar = (props) => {
  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <label htmlFor="attribute1" className="mr-2">
          {props.valueName}
        </label>
        <input
          type="number"
          id="attribute1"
          className="w-16 text-center"
          value={props.value}
          onChange={props.handleValueChange}
        />
        <input
          type="range"
          min={props.minimum}
          max={props.maximum}
          value={props.value}
          onChange={props.handleValueChange}
          className="flex-grow ml-4"
        />
      </div>
    </div>
  );
};
