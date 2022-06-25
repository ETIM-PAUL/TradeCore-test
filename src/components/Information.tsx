import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { setCurrentStep, setPreviousStep } from "../redux/setCurrentStepSlice";
import { moveSlides, skipSlide } from "../utils/navController";
import Progress from "./Progress";

const Information = ({
  genre,
  subgenre,
  booktitle,
  bookDes,
  requiredT,
  requiredDes,
  setSelected,
  setBookDes,
  setRequiredT,
  setBookTitle,
  setCheckedDesc,
  setDes,
  setSubgenre,
}: any) => {
  const dispatch = useAppDispatch();
  const selector = useSelector;
  const step = selector((state: any) => state.CurrentStep.prevStep);

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
  return (
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
  );
};

export default Information;
