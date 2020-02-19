import React from "react";
import renderer from "react-test-renderer";
import FilmsList from "./films-list.jsx";
import {filmsList} from "../../mocks/test-mocks.js";

it(`<FilmsList /> should render correctly`, () => {
  const tree = renderer
    .create(
        <FilmsList
          filmsList={filmsList}
          onHeaderClickHandler = {() => {}}
          onFilmCardClickHandler = {() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
