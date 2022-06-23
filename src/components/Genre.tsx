import React, { useEffect, useState } from "react";
import { initialSubGenreProps } from "../utils/initialState";
import Controller from "./Controller";

const Genres = () => {
  const [genre, setGenre] = useState("");
  const [subGenre, setSubGenre] = useState("");
  const [selected, setSelected] = useState(false);
  const [addSubGenre, setAddSubGenre] = useState(initialSubGenreProps);

  function setSelectedGenre({ value }: any) {
    if (genre !== value || subGenre !== value) {
      setGenre(value);
      setSubGenre(value);
      console.log(value, "selected");
      setSelected(true);
    }
    if (genre === value) {
      setGenre("");
      setSelected(false);
      console.log(value, "deselected");
    }
  }

  const Genre = ({ value }: any) => {
    return (
      <div className="genre-div">
        <button
          className={genre !== value ? "genre-button" : "selected"}
          value={value}
          id={value}
          onClick={() => setSelectedGenre({ value })}
        >
          {value}
        </button>
      </div>
    );
  };

  const InputData = ({ label }: any, { type }: any) => {
    return (
      <>
        <label>{label}</label>
        <input placeholder={label} className="input-genre" />
      </>
    );
  };

  return (
    <div>
      <div className="step current-step">
        <section>
          <Genre value="Genre 1" />
          <Genre value="Genre 2" />
          <Genre value="Genre 3" />
          <Genre value="Genre 4" />
        </section>
      </div>

      <div className="step">
        <section>
          <Genre value="Subgenre 1" />
          <Genre value="Subgenre 2" />
          <Genre value="Subgenre 3" />
          <Genre value="Subgenre 4" />
          <Genre value="Subgenre 5" />
          <Genre value="Subgenre 6" />
          <Genre value="Subgenre 7" />
          <Genre value="Subgenre 8" />
          <Genre value="Add New" />
        </section>
      </div>

      <div className="step">
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
      </div>

      <div className="step">
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
      </div>
      <Controller selected={selected} />

      <div className="step">
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
              <button className="add-another-book">Add another Book</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Genres;
