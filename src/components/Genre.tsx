import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCurrentStep } from "../redux/setCurrentStepSlice";
import {
  getSubGenres,
  removeSubGenres,
  setGenreValues,
} from "../redux/setGenreSlice";
import { moveSlides } from "../utils/navController";
import AddNewSubGenre from "./AddNewSubGenre";
import Information from "./Information";
import Progress from "./Progress";
import SelectSubgenre from "./SelectSubgenre";
import Success from "./Success";

const Genres = () => {
  const [genre, setGenre] = useState("");
  const [subgenre, setSubgenre] = useState("");
  const [des, setDes] = useState<string>("");
  const [booktitle, setBookTitle] = useState("");
  const [bookDes, setBookDes] = useState("");
  const [requiredDes, setRequiredDesc] = useState(false);
  const [requiredT, setRequiredT] = useState(true);
  const [checkedDes, setCheckedDesc] = useState(false);
  const [selected, setSelected] = useState(false);
  const dispatch = useAppDispatch();
  const selector = useAppSelector;

  const genres = selector((state: any) => state.Genres.genre.genres);

  function setSelectedGenre(value: any, id: number) {
    if (genre !== value) {
      setGenre(value);
      setSelected(true);
      dispatch(getSubGenres(id));
    }
    if (genre === value) {
      setGenre("");
      setSelected(false);
      dispatch(removeSubGenres());
    }
  }
  useEffect(() => {
    const button = document.querySelectorAll(".next");
    function disableButton() {
      button.forEach((btn: any) => {
        if (selected) {
          btn.disabled = false;
        } else {
          btn.disabled = true;
        }
      });
    }
    disableButton();
    dispatch(setGenreValues());
  }, [dispatch, selected]);

  return (
    <div>
      <div className="step current-step" id="genre">
        <Progress />

        <section>
          {genres.map((g: any) => (
            <div className="genre-div" key={g.name}>
              <button
                className={genre !== g.name ? "genre-button" : "selected"}
                value={g.name}
                id={g.name}
                onClick={() => setSelectedGenre(g.name, g.id)}
              >
                {g.name}
              </button>
            </div>
          ))}
        </section>
        <div className="nav-div">
          <div>
            <input
              className="nav-button next"
              value="Next"
              type="button"
              onClick={(e: any) => {
                moveSlides(1, setSelected);
                dispatch(setCurrentStep("selectingSubGenre"));
              }}
            />
          </div>
        </div>
      </div>

      <SelectSubgenre
        genre={genre}
        setSubgenre={setSubgenre}
        setSelected={setSelected}
        setRequiredDesc={setRequiredDesc}
        subgenre={subgenre}
        setGenre={setGenre}
      />
      <AddNewSubGenre
        des={des}
        setDes={setDes}
        setSelected={setSelected}
        setSubgenre={setSubgenre}
        checkedDes={checkedDes}
        setRequiredDesc={setRequiredDesc}
        setCheckedDesc={setCheckedDesc}
      />

      <Information
        genre={genre}
        subgenre={subgenre}
        booktitle={booktitle}
        bookDes={bookDes}
        requiredT={requiredT}
        requiredDes={requiredDes}
        setSelected={setSelected}
        setBookDes={setBookDes}
        setRequiredT={setRequiredT}
        setBookTitle={setBookTitle}
        setCheckedDesc={setCheckedDesc}
        setDes={setDes}
        setSubgenre={setSubgenre}
      />

      <Success
        setGenre={setGenre}
        setSubgenre={setSubgenre}
        setDes={setDes}
        setCheckedDesc={setCheckedDesc}
        setRequiredT={setRequiredT}
      />
    </div>
  );
};

export default Genres;
