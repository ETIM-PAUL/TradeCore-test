import next from "next";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCurrentStep } from "../redux/setCurrentStepSlice";
import {
  getSubGenres,
  removeSubGenres,
  setGenreValues,
} from "../redux/setGenreSlice";
import { initialSubGenreProps } from "../utils/initialState";
import {
  firstSlide,
  jumpSlide,
  moveSlides,
  prevSlide,
  skipSlide,
} from "../utils/navController";
import Controller from "./Controller";
import Progress from "./Progress";

const Genres = () => {
  const [genre, setGenre] = useState("");
  const [subgenre, setSubgenre] = useState("");
  const [selected, setSelected] = useState(false);
  const [addSubBook, setAddBook] = useState(initialSubGenreProps);
  const dispatch = useAppDispatch();
  const selector = useAppSelector;

  const genres = selector((state: any) => state.Genres.genre.genres);
  const subGenres = selector((state: any) => state.Genres.subGenre);
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

  function setSelectedSubGenre(value: any) {
    if (genre !== value) {
      setSubgenre(value);
      setSelected(true);
    }
    if (genre === value) {
      setSubgenre("");
      setSelected(false);
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

  const Genre = () => {
    return (
      <>
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
      </>
    );
  };

  const SubGenre = () => {
    return (
      <>
        {subGenres.map((g: any) => (
          <div className="genre-div" key={g.name}>
            <button
              className={subgenre !== g.name ? "genre-button" : "selected"}
              value={g.name}
              id={g.name}
              onClick={() => setSelectedSubGenre(g.name)}
            >
              {g.name}
            </button>
          </div>
        ))}
      </>
    );
  };

  const InputData = ({ label }: any, { type }: any) => {
    return (
      <>
        <label>{label}</label>
        <input placeholder={label} className="input-genre" required />
      </>
    );
  };

  return (
    <div>
      <div className="step current-step" id="genre">
        <Progress />

        <section>
          <Genre />
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

      <div className="step" id="subGenre">
        <Progress />
        <section>
          <SubGenre />
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
                dispatch(removeSubGenres());
                dispatch(setCurrentStep("selectingSubGenre"));
              }}
            />
          </div>
          <div>
            <input
              className="nav-button next"
              value="Next"
              type="button"
              id="subGenre"
              onClick={(e: any) => {
                jumpSlide(3, setSelected);
                dispatch(setCurrentStep("addInformation"));
              }}
            />
          </div>
        </div>
      </div>

      <div className="step" id="newSubgenre">
        <Progress />
        <section>
          <input placeholder="Subgenre name" className="input-genre" />
          <div className="subgenre-checkbox-div">
            <input
              placeholder="Subgenre name"
              type="checkbox"
              className="checkbox"
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
                dispatch(setCurrentStep("addNewBook"));
              }}
            />
          </div>
        </div>
      </div>

      <div className="step" id="addBook">
        <Progress />

        <form>
          <section>
            <InputData label="Book title" />

            <div className="input">
              <label>Author</label>
              <select className="select">
                <option value="" disabled selected hidden>
                  Author
                </option>
                <option>Author 1</option>
                <option>Author 2</option>
              </select>
            </div>

            <InputData label="ISBN" />

            <div className="input">
              <label>Publisher</label>
              <select className="select">
                <option value="" disabled selected hidden>
                  Publisher
                </option>
                <option>Publisher 1</option>
                <option>Publisher 2</option>
              </select>
            </div>

            <div className="input less-width">
              <label>Date published</label>
              <input type="date" className="input-date" />
            </div>

            <div className="input less-width">
              <label>Number of pages</label>
              <input
                placeholder="Number of pages"
                className="input-pages"
                type="number"
              />
            </div>

            <div className="input less-width">
              <label>Format</label>
              <select className="format">
                <option value="" disabled selected hidden>
                  Format
                </option>
                <option>Fiction</option>
                <option>Non-fiction</option>
              </select>
            </div>

            <div className="input">
              <div className="edit">
                <label>Edition</label>
                <label>Edition language</label>
              </div>
              <div className="edit-input">
                <input placeholder="Edition" className="input-edit" />
                <select placeholder="Edition language" className="edit-lang">
                  <option value="" disabled selected hidden>
                    Edition Language
                  </option>
                  <option>English</option>
                  <option>Serbian</option>
                </select>
              </div>
            </div>

            <div className="input">
              <label>Description</label>
              <textarea
                placeholder="Type the description..."
                rows={4}
                cols={50}
              />
            </div>
          </section>
          <div className="nav-div">
            <div>
              <input
                className="nav-button back"
                value="Back"
                type="button"
                onClick={() => {
                  skipSlide(3);
                  setSubgenre("");
                  dispatch(setCurrentStep("selectingSubGenre"));
                }}
              />
            </div>
            <div>
              <input
                className="nav-button add"
                value="Add"
                type="submit"
                onClick={(e: any) => {
                  moveSlides(4, setSelected);
                  dispatch(setCurrentStep("finished"));
                }}
              />
            </div>
          </div>
        </form>
      </div>

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
                  dispatch(removeSubGenres());
                  setGenre("");
                  setSubgenre("");
                }}
              >
                Add another Book
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Genres;
