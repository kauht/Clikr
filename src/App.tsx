import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {

  return (
    <main className="container">
      <div className="App">
        <div className="ClickInterval">
        <select className="IntervalSelect1">
            <option value="1">Miliseconds</option>
            <option value="2">Seconds</option>
            <option value="3">Minutes</option>
          </select>
          <input type="text" className="Time"/>
          <select className="IntervalSelect2">
            <option value="1">Miliseconds</option>
            <option value="2">Seconds</option>
            <option value="3">Minutes</option>
          </select>
          <input type="text" className="Time"/>
        </div>
      </div>
    </main>
  );
}

export default App;
