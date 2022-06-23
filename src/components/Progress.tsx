import React from "react";
import "../styles/base.css";
import "../styles/progress.css";
const Progress = () => {
  return (
    <div className="progress-section">
      <header>Add Book - New book</header>

      <div className="progress-steps">
        <div
          className="progress-step progress-step-current"
          data-title="Genre"
        ></div>
        <div className="line"></div>
        <div className="progress-step" data-title="Subgenre"></div>
        <div className="line"></div>

        <div className="progress-step" data-title="Add new subgenre"></div>
        <div className="line"></div>

        <div className="progress-step" data-title="Information"></div>
      </div>
    </div>
  );
};

export default Progress;
