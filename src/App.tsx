import React from "react";
import "./App.css";
import Genres from "./components/Genre";
import Progress from "./components/Progress";

function App() {
  return (
    <div className="App">
      <Progress />
      <Genres />
    </div>
  );
}

export default App;
