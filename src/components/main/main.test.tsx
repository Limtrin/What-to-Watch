import * as React from "react";
import * as renderer from "react-test-renderer";
import Main from "./main";
import {Provider} from "react-redux";
import {filmsList, film} from "../../mocks/test-mocks";
import configureStore from "redux-mock-store";
import {BrowserRouter} from "react-router-dom";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../reducer/user/user";
import {noop} from "../../utils";

const mockStore = configureStore([]);

it(`Render Main`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      genre: `All genres`,
      filmsList,
      filmsCurrent: filmsList,
      showedFilms: filmsList
    }
  });
  const main = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter >
            <Main
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              film={film}
              onFilmCardClickHandler={noop}
              onFilmFavoriteStatusClickHandler={noop}
            />
          </BrowserRouter >
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(main).toMatchSnapshot();
});
