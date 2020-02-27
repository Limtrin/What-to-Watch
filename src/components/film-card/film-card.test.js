import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card.jsx";
import {film} from "../../mocks/test-mocks.js";

it(`<FilmCard /> should render correctly`, () => {
  const tree = renderer
    .create(
        <FilmCard
          film={film}
          handleMouseEnter={() => {}}
          handleMouseLeave={() => {}}
          onHeaderClickHandler={() => {}}
          onFilmCardClickHandler={() => {}}
          renderPlayer={()=>{}}
        />, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
