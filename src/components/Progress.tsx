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
        <div className="progress-step progress-step-current" data-title="Genre">
          {/* <span className="progress-number">1</span> */}
        </div>
        <div className="line"></div>
        <div className="progress-step" data-title="Subgenre">
          {/* <span className="progress-number">2</span> */}
        </div>
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
            <div className="progress-step" data-title="Add new subgenre">
              {/* <span className="progress-number">3</span> */}
            </div>
          </>
        )}

        {(currentStep === "addInformation" ||
          currentStep === "addNewSubGenre") && (
          <>
            <div className="line"></div>
            <div className="progress-step" data-title="Information">
              {/* <span className="progress-number">4</span> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Progress;
