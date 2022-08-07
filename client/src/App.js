import "./App.css";
import Main from "./pages/main";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Router>
      <div className="App">
        <Provider store={store}>
          <React.StrictMode>
            <Main />
          </React.StrictMode>
        </Provider>
      </div>
    </Router>
  );
}

export default App;
