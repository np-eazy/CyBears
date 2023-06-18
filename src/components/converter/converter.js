import React from "react";
import { UploadStage } from "./uploadStage/uploadStage";
import { ConverterStatus } from "./converterStatus";
import { Output } from "./renderer/output";
import { defaultPanel, defaultSpacing } from "../../utils/styles";
import { ParamPanel } from "./paramPanel/paramPanel";
import { Panel } from "../base/panel";

const converterStyle = {
  display: "inline-block",
  ...defaultSpacing,
};

export const Converter = (props) => {
  return (
    <div style={converterStyle}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Panel>
          <UploadStage />
        </Panel>
        <Panel>
          <ParamPanel />
          <ConverterStatus />
        </Panel>
        <Panel>
          <Output />
        </Panel>
      </div>
    </div>
  );
};
