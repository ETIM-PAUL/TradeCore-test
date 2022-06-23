import React, { useEffect, useState } from "react";

const Controller = ({ selected }: any) => {
  useEffect(() => {
    function disableButton() {
      const button =
        (document.getElementById("next") as HTMLInputElement) || null;
      if (selected) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    }
    disableButton();
  }, [selected]);

  return (
    <div className="nav-div">
      <div>
        <input
          className="nav-button"
          value="Back"
          type="button"
          id="prev"
          onClick={() => console.log("clicked")}
        />
      </div>
      <div>
        <input
          className="nav-button"
          value="Next"
          disabled={true}
          type="button"
          id="next"
          onClick={() => console.log("clicked")}
        />
      </div>
    </div>
  );
};

export default Controller;
