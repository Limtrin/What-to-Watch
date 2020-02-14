import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const headerClickHandler = () => {};

const App = ({filmName, filmGenre, filmYear, filmsList}) => {
  return (
    <Main
      filmName={filmName}
      filmGenre={filmGenre}
      filmYear={filmYear}
      filmsList={filmsList}
      onHeaderClickHandler={headerClickHandler}
    />
  );
};

App.propTypes = {
  filmName: PropTypes.string.isRequired,
  filmGenre: PropTypes.string.isRequired,
  filmYear: PropTypes.string.isRequired,
  filmsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  })).isRequired
};

export default App;
