import React from "react";
import renderer from "react-test-renderer";
import FilmsList from "./films-list.jsx";
import {filmsList} from "../../mocks/test-mocks.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

it(`<FilmsList /> should render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      genre: `All genres`,
      filmsList,
      filmsCurrent: filmsList,
      showedFilms: filmsList
    }
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <FilmsList
            onHeaderClickHandler = {() => {}}
            onFilmCardClickHandler = {() => {}}
            onItemEnterHandler = {() => {}}
            onItemLeaveHandler = {() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
