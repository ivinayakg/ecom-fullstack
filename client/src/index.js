import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";

// Call make Server
makeServer();

ReactDOM.render(<App />, document.getElementById("root"));
