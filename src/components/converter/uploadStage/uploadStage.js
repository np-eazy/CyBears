import { defaultSpacing } from "../../../utils/styles";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "MOV", "MP4", "M4A"];

const uploadStageStyle = {
  ...defaultSpacing,
};

export const UploadStage = (props) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleChange = (file) => {
    setFile(file);
  };

  const handleText = (event) => {
    setText(event.target.value);
  };

  return (
    <div style={{ ...uploadStageStyle, position: "relative", bottom: 0 }}>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        style={{}}
      />
      <div
        style={{
          marginTop: 10,
        }}
      >
        <textarea
          value={text}
          onChange={handleText}
          rows={4}
          cols={56}
          placeholder="Enter your long text here..."
        />
      </div>
    </div>
  );
};
