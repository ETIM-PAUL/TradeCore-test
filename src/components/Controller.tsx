import React, { useState } from "react";

const Controller = () => {
  const [selected, setSelected] = useState();

  function setSelectedGenre({ value }: any) {
    setSelected(value);
    console.log("selected");
  }
  const ContollerButton = ({ value, styling }: any) => {
    return (
      <div>
        <button
          className="nav-button"
          value={value}
          onClick={() => console.log("selected")}
        >
          {value}
        </button>
      </div>
    );
  };
  return (
    <div className="nav-div">
      <ContollerButton
        value="Back"
        styling="back-nav-button"
        onClick={() => console.log("kk")}
      />
      <ContollerButton value="Next" styling="next-nav-button" />
    </div>
  );
};

export default Controller;
