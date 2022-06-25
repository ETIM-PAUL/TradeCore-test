import React from "react";
import { useAppDispatch } from "../app/hooks";
import { setCurrentStep, setPreviousStep } from "../redux/setCurrentStepSlice";
import { setCurrentInfo } from "../redux/setGenreSlice";
import { moveSlides, prevSlide } from "../utils/navController";
import { checked, desc, saveSubgenre } from "../utils/operations";
import Progress from "./Progress";

interface AddNewSubGenreProps {
  des: string;
  setDes: any;
  setSelected: any;
  setSubgenre: any;
  checkedDes: any;
  setRequiredDesc: any;
  setCheckedDesc: any;
}

const AddNewSubGenre = ({
  des,
  setDes,
  setSelected,
  setSubgenre,
  checkedDes,
  setRequiredDesc,
  setCheckedDesc,
}: AddNewSubGenreProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="step" id="addNewSubGenre">
      <Progress />
      <section>
        <input
          placeholder="Subgenre name"
          value={des}
          className="input-genre"
          onChange={(e) =>
            desc(e.target.value, setDes, setSubgenre, setSelected)
          }
        />
        <div className="subgenre-checkbox-div">
          <input
            placeholder="Subgenre name"
            type="checkbox"
            className="checkbox"
            checked={checkedDes}
            onChange={() =>
              checked(checkedDes, setRequiredDesc, setCheckedDesc)
            }
          />
          <span>Description is required for this subgenre</span>
        </div>
      </section>
      <div className="nav-div">
        <div>
          <input
            className="nav-button"
            value="Back"
            type="button"
            id="back"
            onClick={() => {
              prevSlide(2);
              dispatch(setCurrentStep("selectingSubGenre"));
              setDes("");
              setSelected(false);
              setCheckedDesc(false);
            }}
          />
        </div>
        <div>
          <input
            className="nav-button next"
            value="Next"
            type="button"
            onClick={(e: any) => {
              moveSlides(3, setSelected);
              dispatch(setCurrentStep("addInformation"));
              dispatch(setCurrentInfo({ Subgenre: des }));
              dispatch(setPreviousStep("addNewSubGenre"));
              saveSubgenre(des, checkedDes);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewSubGenre;
