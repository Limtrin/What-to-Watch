import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmsList from "./films-list";
import {filmsList} from "../../mocks/test-mocks";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {BrowserRouter} from "react-router-dom";
import {noop} from "../../utils";

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
              onHeaderClickHandler = {noop}
              onFilmCardClickHandler = {noop}
              onItemEnterHandler = {noop}
              onItemLeaveHandler = {noop}
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
