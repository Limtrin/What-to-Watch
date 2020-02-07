import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const App = ({filmName, filmGenre, filmYear, filmsList}) => {
  return (
    <Main
      filmName={filmName}
      filmGenre={filmGenre}
      filmYear={filmYear}
      filmsList={filmsList}
    />
  );
};

App.propTypes = {
  filmName: PropTypes.string.isRequired,
  filmGenre: PropTypes.string.isRequired,
  filmYear: PropTypes.string.isRequired,
  filmsList: PropTypes.arrayOf(PropTypes.string)
};

export default App;
