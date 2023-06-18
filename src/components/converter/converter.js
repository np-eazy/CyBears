import React, { useState } from "react";
import { UploadStage } from "./uploadStage/uploadStage";
import { ConverterStatus } from "./converterStatus";
import { Output } from "./renderer/output";
import { defaultPanel, defaultSpacing } from "../../utils/styles";
import { ParamPanel } from "./paramPanel/paramPanel";
import { Panel } from "../base/panel";
import { Button } from "../base/button";

const converterStyle = {
  display: "inline-block",
  ...defaultSpacing,
};

export const Converter = (props) => {
  const [loadingStatus, setLoadingStatus] = new useState(false);
  return (
    <div style={converterStyle}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Panel width={500} height={500} 
        description={
          "Upload an image, and tell the AI what you want to extract from the image. "
        }>
          <UploadStage />
        </Panel>
        <Panel height={500} description={
          "Edit the following parameters to change the model output. "
        }>
          <ParamPanel />
          {/* <ConverterStatus /> */}
          <Button clickHandler={(e) => {}}>
            {"Convert!"}
          </Button>
        </Panel>
        <Panel width={540} height={500} description={
          "View the finished model! "
        }>
          <Output display={loadingStatus} />
        </Panel>
      </div>
    </div>
  );
};
