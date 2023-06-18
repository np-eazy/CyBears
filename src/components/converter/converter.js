import React from "react";
import { UploadStage } from "./uploadStage/uploadStage";
import { ConverterStatus } from "./converterStatus";
import { Output } from "./renderer/output";
import { defaultSpacing } from "../../styles";
import { ParamPanel } from "./paramPanel/paramPanel";

const converterStyle = {
  display: "inline-block",
  ...defaultSpacing,
  borderStyle: "solid",
  borderWidth: 1,
};

export const Converter = (props) => {
  return (
    <div style={converterStyle}>
      <div style={defaultSpacing}>
        <UploadStage />
        <ParamPanel />
        <ConverterStatus />
        <Output />
      </div>
    </div>
  );
};
