import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hooks";
import { setCurrentStep, setPreviousStep } from "../redux/setCurrentStepSlice";
import { setCurrentInfo } from "../redux/setGenreSlice";
import { moveSlides, skipSlide } from "../utils/navController";
import { saveBookInfo } from "../utils/operations";
import icon from "../icon/less.png";
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
  setRequiredDes,
}: any) => {
  const dispatch = useAppDispatch();
  const selector = useSelector;
  const step = selector((state: any) => state.CurrentStep.prevStep);
  const currentInfo = selector((state: any) => state.Genres.currentData);
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [pages, setPages] = useState(0);
  const [format, setFormat] = useState("");
  const [edition, setEdition] = useState("");
  const [language, setLanguage] = useState("");

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
    let bookDetails = {
      booktitle,
      bookDes,
      author,
      isbn,
      date,
      pages,
      format,
      language,
    };
    if (requiredT === true && !booktitle) {
      toast("Book Title is required");
    } else if (requiredT === true && requiredDes === true && !bookDes) {
      toast("Book Description is required");
    } else {
      setRequiredT(false);
      dispatch(setCurrentInfo({ BookInfo: bookDetails }));
      moveSlides(4, setSelected);
      dispatch(setCurrentStep("finished"));
      saveBookInfo(JSON.parse(currentInfo));
      setBookDes("");
      setBookTitle("");
      setRequiredT(true);
      setAuthor("");
      setIsbn("");
      setEdition("");
      setLanguage("");
      setPages(0);
      setFormat("");
      setDate(new Date().toISOString().slice(0, 10));
      setRequiredDes(false);
    }
  }
  return (
    <div className="step form-information" id="addInformation">
      <Progress />
      <div className="section-form">
        <label>Book title</label>
        <input
          placeholder="Book title"
          className="input-genre"
          value={booktitle}
          onChange={(e) => {
            setBookTitle(e.target.value);
          }}
        />

        <div className="input">
          <label>Author</label>
          <select
            className="select"
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value="" disabled selected hidden>
              Choose Author
            </option>
            <option value="Author 1">Author 1</option>
            <option value="Author 2">Author 2</option>
          </select>
        </div>

        <label>ISBN</label>
        <input
          placeholder="ISBN"
          className="input-genre"
          value={isbn}
          onChange={(e) => {
            setIsbn(e.target.value);
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
            value={date}
            onChange={(e) =>
              setDate(new Date(e.target.value).toISOString().slice(0, 10))
            }
          />
        </div>

        <div className="input less-width">
          <label>Number of pages</label>
          <input
            placeholder="Number of pages"
            className="input-pages"
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.valueAsNumber)}
          />
        </div>

        <div className="input less-width">
          <label>Format</label>
          <select
            className="format"
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="" disabled selected hidden>
              Format
            </option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-fiction</option>
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
              value={edition}
              onChange={(e) => setEdition(e.target.value)}
            />
            <select
              placeholder="Edition language"
              className="edit-lang"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="" disabled selected hidden>
                Edition Language
              </option>
              <option value="English">English</option>
              <option value="Serbian">Serbian</option>
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
      </div>
      <div className="nav-div">
        <div className="back-button">
          <img src={icon} className="prev-icon" alt="icon" />
          <input
            className="back"
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
            onClick={valiDateEntries}
          />
        </div>
      </div>
    </div>
  );
};

export default Information;
