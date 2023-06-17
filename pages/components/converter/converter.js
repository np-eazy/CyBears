import React from "react"
import { UploadStage } from "./uploadStage"
import { ConverterStatus } from "./converterStatus"
import { Output } from "./output"

const converterStyle = {
    display: "inline-block",
}

export const Converter = (props) => {
    return (<div style={converterStyle}>
        <UploadStage/>
        <ConverterStatus/>
        <Output/>
    </div>)
}