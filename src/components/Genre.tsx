import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCurrentStep, setPreviousStep } from "../redux/setCurrentStepSlice";
import {
  getSubGenres,
  removeSubGenres,
  setGenreValues,
} from "../redux/setGenreSlice";
import {
  firstSlide,
  jumpSlide,
  moveSlides,
  prevSlide,
  skipSlide,
} from "../utils/navController";
import { checked, desc } from "../utils/operations";
import Progress from "./Progress";

const Genres = () => {
  const [genre, setGenre] = useState("");
  const [subgenre, setSubgenre] = useState("");
  const [des, setDes] = useState("");
  const [booktitle, setBookTitle] = useState("");
  const [bookDes, setBookDes] = useState("");
  const [requiredDes, setRequiredDesc] = useState(false);
  const [requiredT, setRequiredT] = useState(true);
  const [checkedDes, setCheckedDesc] = useState(false);
  const [selected, setSelected] = useState(false);
  const dispatch = useAppDispatch();
  const selector = useAppSelector;

  const genres = selector((state: any) => state.Genres.genre.genres);
  const step = selector((state: any) => state.CurrentStep.prevStep);
  const subGenres = selector((state: any) => state.Genres.subGenre);

  function skipStartSlide() {
    if (step === "addNewSubGenre") {
      skipSlide(3, step);
      dispatch(setCurrentStep("addNewSubGenre"));
    } else if (step === null) {
      skipSlide(2, step);
      dispatch(setCurrentStep("selectingSubGenre"));
    }
  }

  function valiDateEntries() {
    let bookDetails = { genre, subgenre, booktitle, bookDes };
    if (requiredT === true) {
      if (!booktitle) {
        alert("Please fill a book title");
      }
      if (requiredDes === true && !bookDes) {
        alert("please fill a description");
      }
    } else if (requiredT === false) {
      moveSlides(4, setSelected);
      dispatch(setCurrentStep("finished"));
      setBookDes("");
      setBookTitle("");
      setRequiredT(true);
      console.log(JSON.stringify(bookDetails));
    }
  }

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
              onClick={() =>
                setSelectedSubGenre(g.name, g.isDescriptionRequired)
              }
            >
              {g.name}
            </button>
          </div>
        ))}
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
                dispatch(setPreviousStep("addNewSubGenre"));
              }}
            />
          </div>
        </div>
      </div>

      <div className="step form-information">
        <Progress />
        <section>
          <label>Book title</label>
          <input
            placeholder="Book title"
            className="input-genre"
            value={booktitle}
            onChange={(e) => {
              setBookTitle(e.target.value);
              setRequiredT(false);
            }}
          />

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

          <label>ISBN</label>
          <input
            placeholder="ISBN"
            className="input-genre"
            // value={booktitle}
            onChange={(e) => {
              // setBookTitle(e.target.value);
            }}
          />

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
            <input
              type="date"
              className="input-date"
              // onChange={(e) => (addBook.date = new Date(e.target.value))}
            />
          </div>

          <div className="input less-width">
            <label>Number of pages</label>
            <input
              placeholder="Number of pages"
              className="input-pages"
              type="number"
              // onChange={(e) => (addBook.noOfPages = e.target.valueAsNumber)}
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
              <input
                placeholder="Edition"
                className="input-edit"
                // onChange={(e) => (addBook.edition = e.target.value)}
              />
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
              value={bookDes}
              onChange={(e) => setBookDes(e.target.value)}
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
                skipStartSlide();
                setSubgenre("");
                dispatch(setPreviousStep(null));
                setDes("");
                setCheckedDesc(false);
              }}
            />
          </div>
          <div>
            <input
              className="nav-button add"
              value="Add"
              id="add"
              type="button"
              onClick={() => valiDateEntries()}
            />
          </div>
        </div>
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
                  dispatch(setPreviousStep(null));
                  dispatch(removeSubGenres());
                  setGenre("");
                  setSubgenre("");
                  setDes("");
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
