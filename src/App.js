import React, { Component } from "react";
import Form from "./Form";

export default class App extends Component {
    componentDidCatch(error) {
        console.log(
            `%c ERROR`,
            `color:#fff;
            padding:5px; 
            line-height: 12px; 
            font-size:13px; 
            background-color:red;
            text-shadow:1px 0px 1px #2379b5;
            display:block;`
        );
        console.log(error);
    }
    render() {
        return (
            <div className="AppForm">
                <Form />
            </div>
        );
    }
}
