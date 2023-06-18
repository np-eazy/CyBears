import { defaultSpacing } from "../../../utils/styles";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "MOV", "MP4", "M4A"];

const uploadStageStyle = {
  ...defaultSpacing,
  height: 500,
  width: 500,
};

export const UploadStage = (props) => {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <div style={uploadStageStyle}>
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} style={{
          minWidth: 500,
          maxWidth: 500,
        }} />
    </div>
  );
};
