import React from "react";
import { Converter } from "./converter/converter";
import { Header } from "./header/header";

export const Page = () => {
    return (<div>
        <Header/>
        <Converter/>
    </div>)
}