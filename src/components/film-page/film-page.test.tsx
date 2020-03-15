import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmPage from "./film-page";
import {film, filmsList} from "../../mocks/test-mocks";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../reducer/user/user";
import {BrowserRouter} from "react-router-dom";
import {noop} from "../../utils";


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
              onFilmCardClickHandler={noop}
              onFilmFavoriteStatusClickHandler={noop}
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
