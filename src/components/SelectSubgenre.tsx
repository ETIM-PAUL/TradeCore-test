import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCurrentStep } from "../redux/setCurrentStepSlice";
import { removeSubGenres, setCurrentInfo } from "../redux/setGenreSlice";
import { jumpSlide, moveSlides, prevSlide } from "../utils/navController";
import Progress from "./Progress";

const SelectSubgenre = ({
  genre,
  setSubgenre,
  setSelected,
  setRequiredDesc,
  subgenre,
  setGenre,
}: any) => {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();

  function setSelectedSubGenre(value: any, required: boolean) {
    if (genre !== value) {
      setSubgenre(value);
      setSelected(true);
      setRequiredDesc(required);
    }
    if (genre === value) {
      setSubgenre("");
      setSelected(false);
      setRequiredDesc(required);
    }
  }
  const subGenres = selector((state: any) => state.Genres.subGenre);
  return (
    <div className="step" id="selectingSubGenre">
      <Progress />
      <section>
        {subGenres.map((g: any) => (
          <div className="genre-div" key={g.name}>
            <button
              className={subgenre !== g.name ? "genre-button" : "selected"}
              value={g.name}
              id={g.name}
              onClick={() => {
                setSelectedSubGenre(g.name, g.isDescriptionRequired);
                dispatch(setCurrentInfo({ Subgenre: g.name }));
              }}
            >
              {g.name}
            </button>
          </div>
        ))}
        <div className="genre-div">
          <button
            className="genre-button"
            onClick={(e: any) => {
              moveSlides(2, setSelected);
              dispatch(setCurrentStep("addNewSubGenre"));
            }}
          >
            Add new
          </button>
        </div>
      </section>
      <div className="nav-div">
        <div>
          <input
            className="nav-button back"
            value="Back"
            type="button"
            onClick={() => {
              prevSlide(1);
              setGenre("");
              setSubgenre("");
              setSelected(false);
              dispatch(removeSubGenres());
              dispatch(setCurrentStep("selectingGenre"));
            }}
          />
        </div>
        <div>
          <input
            className="nav-button next"
            value="Next"
            type="button"
            id="subGenre"
            onClick={() => {
              jumpSlide(3, setSelected);
              dispatch(setCurrentStep("addInformation"));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectSubgenre;
