import React, { useState } from "react";
import { SliderBar } from "./sliderBar";

export const ParamPanel = () => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);

  const handleValue1Change = (e) => {
    setValue1(parseInt(e.target.value));
  };

  const handleValue2Change = (e) => {
    setValue2(parseInt(e.target.value));
  };

  const handleValue3Change = (e) => {
    setValue3(parseInt(e.target.value));
  };

  const handleValue1Increment = () => {
    setValue1(value1 + 1);
  };

  const handleValue1Decrement = () => {
    setValue1(value1 - 1);
  };

  const handleValue2Increment = () => {
    setValue2(value2 + 1);
  };

  const handleValue2Decrement = () => {
    setValue2(value2 - 1);
  };

  const handleValue3Increment = () => {
    setValue3(value3 + 1);
  };

  const handleValue3Decrement = () => {
    setValue3(value3 - 1);
  };

  return (
    <div className="p-4">
      <SliderBar
        valueName={"Number of frames"}
        value={value1}
        minimum={0}
        maximum={100}
        initialValue={50}
        handleValueChange={handleValue1Change}
        handleValueIncrement={handleValue1Increment}
        handleValue1Decrement={handleValue1Decrement}
      />
      <SliderBar
        valueName={"Resolution"}
        value={value2}
        minimum={0}
        maximum={5}
        initialValue={2}
        handleValueChange={handleValue2Change}
        handleValueIncrement={handleValue2Increment}
        handleValue1Decrement={handleValue2Decrement}
      />
      <SliderBar
        valueName={"Precision"}
        value={value3}
        minimum={0}
        maximum={100}
        initialValue={50}
        handleValueChange={handleValue3Change}
        handleValueIncrement={handleValue3Increment}
        handleValue1Decrement={handleValue3Decrement}
      />
    </div>
  );
};

export default ParamPanel;
