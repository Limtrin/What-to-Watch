import React from "react";
import renderer from "react-test-renderer";
import FilmsList from "./films-list.jsx";
import {filmsList} from "../../mocks/test-mocks.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

it(`<FilmsList /> should render correctly`, () => {
  const store = mockStore({
    genre: `All genres`,
    filmsList,
    filmsCurrent: filmsList,
    showedFilms: filmsList
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <FilmsList
            onHeaderClickHandler = {() => {}}
            onFilmCardClickHandler = {() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
