import React from "react";
import { useAppSelector } from "../app/hooks";
import "../styles/base.css";
import "../styles/progress.css";
const Progress = () => {
  const selector = useAppSelector;
  const currentStep = selector((state: any) => state.CurrentStep.step);
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
        {(currentStep === "selectingSubGenre" ||
          currentStep === "selectingGenre" ||
          currentStep === "finished") && (
          <>
            <div className="line"></div>
            <div className="progress-step-dots">
              <span className="progress-number">...</span>
            </div>
          </>
        )}
        {currentStep === "addNewSubGenre" && (
          <>
            <div className="line"></div>
            <div className="progress-step" data-title="Add new subgenre"></div>
          </>
        )}

        {(currentStep === "addInformation" ||
          currentStep === "addNewSubGenre") && (
          <>
            <div className="line"></div>
            <div className="progress-step" data-title="Information"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Progress;
