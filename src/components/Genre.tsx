import React from "react";

const Genres = () => {
  const Genre = ({ value }: any) => {
    return (
      <div>
        <button className="genre-button">{value}</button>
      </div>
    );
  };

  return (
    <section>
      <Genre value="Genre 1" />
      <Genre value="Genre 2" />
      <Genre value="Genre 3" />
      <Genre value="Genre 4" />
    </section>
  );
};

export default Genres;
