import React from "react";
import renderer from "react-test-renderer";
import SimilarFIlms from "./similar-films";
import {filmsList, film} from "../../mocks/test-mocks.js";

it(`Should render SimilarMovies component`, () => {
  const tree = renderer
    .create(
        <SimilarFIlms filmsList={filmsList} film={film} onFilmCardClickHandler={() => {}} onHeaderClickHandler={() => {}}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
