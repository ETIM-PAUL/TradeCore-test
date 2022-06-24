import { useAppSelector } from "../app/hooks";
import "../styles/base.css";
import "../styles/progress.css";
const Progress = () => {
  const selector = useAppSelector;
  const currentStep = selector((state: any) => state.CurrentStep.step);
  const prevStep = selector((state: any) => state.CurrentStep.prevStep);

  const ProgressStep = ({ stepStatus, title }: any) => {
    return (
      <div
        className={
          currentStep === stepStatus
            ? "progress-step progress-step-current"
            : "progress-step"
        }
      >
        <span>{title}</span>
      </div>
    );
  };
  return (
    <div className="progress-section">
      <header>Add Book - New book</header>

      <div className="progress-steps">
        <ProgressStep stepStatus="selectingGenre" title="Genre" />

        <div className="line"></div>
        <ProgressStep stepStatus="selectingSubGenre" title="Subgenre" />

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

        {(currentStep === "addNewSubGenre" ||
          (prevStep === "addNewSubGenre" &&
            currentStep === "addInformation")) && (
          <>
            <div className="line"></div>
            <ProgressStep
              stepStatus="addNewSubGenre"
              title="Add new subgenre"
            />
          </>
        )}

        {(currentStep === "addInformation" ||
          currentStep === "addNewSubGenre") && (
          <>
            <div className="line"></div>
            <ProgressStep stepStatus="addInformation" title="Information" />
          </>
        )}
      </div>
    </div>
  );
};

export default Progress;
