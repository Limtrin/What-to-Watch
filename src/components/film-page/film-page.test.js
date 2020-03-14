import React from "react";
import renderer from "react-test-renderer";
import FilmPage from "./film-page.jsx";
import {film, filmsList} from "../../mocks/test-mocks.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {BrowserRouter} from "react-router-dom";


const mockStore = configureStore([]);

it(`<FilmPage /> should render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      genre: `All genres`,
      filmsList,
      filmsCurrent: filmsList
    }
  });
  const tree = renderer
    .create(
        <BrowserRouter>
          <Provider store={store}>
            <FilmPage
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              film={film}
              filmsList={filmsList}
              onFilmCardClickHandler={() => {}}
              onHeaderClickHandler={() => {}}
              onItemEnterHandler={() => {}}
              onItemLeaveHandler={() => {}}
              onFilmFavoriteStatusClickHandler={() => {}}
              activeItem={null}
            />
          </Provider>
        </BrowserRouter>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
