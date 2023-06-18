import React from "react";
import { defaultSpacing } from "../../styles";

const converterStatusStyle = {
    ...defaultSpacing,
    borderStyle: "solid",
    borderWidth: 1,
}

export const ConverterStatus = (props) => {
    return (<div style={converterStatusStyle}>
        {"Upload/Conversion Status"}
    </div>)
}