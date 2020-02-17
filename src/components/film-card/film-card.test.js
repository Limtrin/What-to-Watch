import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card.jsx";
import {film} from "../../mocks/test-mocks.js";

it(`<FilmCard /> should render correctly`, () => {
  const tree = renderer
    .create(
        <FilmCard
          film={film}
          onCardMouseEnterHandler={() => {}}
          onCardMouseLeaveHandler={() => {}}
          onHeaderClickHandler={() => {}}
          onFilmCardClickHandler={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
