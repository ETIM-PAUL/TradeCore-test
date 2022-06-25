import React from "react";
import { useAppDispatch } from "../app/hooks";
import { setCurrentStep, setPreviousStep } from "../redux/setCurrentStepSlice";
import { removeSubGenres } from "../redux/setGenreSlice";
import { firstSlide } from "../utils/navController";

const Success = ({
  setGenre,
  setSubgenre,
  setDes,
  setCheckedDesc,
  setRequiredT,
}: any) => {
  const dispatch = useAppDispatch();
  return (
    <div className="step" id="last-step">
      <section className="align-center">
        <div>
          <div className="correct-symbol">
            <span className="checkmark">
              <div className="checkmark_circle"></div>
              <div className="checkmark_stem"></div>
              <div className="checkmark_kick"></div>
            </span>
          </div>
          <div>
            <p>Book added successfully</p>
            <button
              id="last-step"
              className="add-another-book"
              onClick={() => {
                firstSlide(0);
                dispatch(setCurrentStep("selectingGenre"));
                dispatch(setPreviousStep(null));
                dispatch(removeSubGenres());
                setGenre("");
                setSubgenre("");
                setDes("");
                setCheckedDesc(false);
                setRequiredT(true);
              }}
            >
              Add another Book
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Success;
