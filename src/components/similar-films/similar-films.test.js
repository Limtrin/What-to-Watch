import React from "react";
import renderer from "react-test-renderer";
import SimilarFIlms from "./similar-films";
import {filmsList, film} from "../../mocks/test-mocks.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

it(`Should render SimilarFilms component`, () => {
  const store = mockStore({
    genre: `All genres`,
    filmsList,
    filmsCurrent: filmsList
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <SimilarFIlms
            film={film}
            onFilmCardClickHandler={() => {}}
            onHeaderClickHandler={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
