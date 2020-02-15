import React from "react";
import renderer from "react-test-renderer";
import FilmPage from "./film-page.jsx";
import {film} from "../../mocks/test-mocks.js";

it(`<FilmPage /> should render correctly`, () => {
  const tree = renderer
    .create(
        <FilmPage
          film={film}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
