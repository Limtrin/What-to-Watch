import React from "react";
import renderer from "react-test-renderer";
import FilmsList from "./films-list.jsx";
import {filmsList} from "../../mocks/test-mocks.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {BrowserRouter} from "react-router-dom";

const mockStore = configureStore([]);

it(`<FilmsList /> should render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      genre: `All genres`,
      filmsList,
      filmsCurrent: filmsList,
      showedFilms: filmsList,
      myListFilms: null
    }
  });
  const tree = renderer
    .create(
        <BrowserRouter>
          <Provider store={store}>
            <FilmsList
              onHeaderClickHandler = {() => {}}
              onFilmCardClickHandler = {() => {}}
              onItemEnterHandler = {() => {}}
              onItemLeaveHandler = {() => {}}
            />
          </Provider>
        </BrowserRouter>
        , {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
