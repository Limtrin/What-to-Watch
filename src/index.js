import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Settings = {
  FILM_NAME: `The Grand Budapest Hotel`,
  FILM_GENRE: `Drama`,
  FILM_YEAR: `2014`
};

ReactDOM.render(
    <App
      filmName={Settings.FILM_NAME}
      filmGenre={Settings.FILM_GENRE}
      filmYear={Settings.FILM_YEAR}
    />,
    document.querySelector(`#root`)
);
