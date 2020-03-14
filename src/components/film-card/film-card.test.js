import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card.jsx";
import {film} from "../../mocks/test-mocks.js";
import {BrowserRouter} from "react-router-dom";

it(`<FilmCard /> should render correctly`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <FilmCard
            film={film}
            handleMouseEnter={() => {}}
            handleMouseLeave={() => {}}
            onHeaderClickHandler={() => {}}
            onFilmCardClickHandler={() => {}}
            renderPlayer={()=>{}}
          />
        </BrowserRouter>
        , {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
