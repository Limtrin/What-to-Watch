import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer.js";

const Settings = {
  FILM_NAME: `The Grand Budapest Hotel`,
  FILM_GENRE: `Drama`,
  FILM_YEAR: `2014`
};

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f);

ReactDOM.render(
    <Provider store={store}>
      <App
        filmName={Settings.FILM_NAME}
        filmGenre={Settings.FILM_GENRE}
        filmYear={Settings.FILM_YEAR}
      />
    </Provider>,
    document.querySelector(`#root`)
);
