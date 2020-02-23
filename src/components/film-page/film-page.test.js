import React from "react";
import renderer from "react-test-renderer";
import FilmPage from "./film-page.jsx";
import {film, filmsList} from "../../mocks/test-mocks.js";

it(`<FilmPage /> should render correctly`, () => {
  const tree = renderer
    .create(
        <FilmPage
          film={film}
          filmsList={filmsList}
          onFilmCardClickHandler={() => {}}
          onHeaderClickHandler={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
