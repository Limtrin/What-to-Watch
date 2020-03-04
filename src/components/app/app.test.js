import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {filmsList, film} from "../../mocks/test-mocks.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH
    },
    [NameSpace.DATA]: {
      genre: `All genres`,
      filmsList,
      filmsCurrent: filmsList,
      showedFilms: filmsList.slice(0, 8),
      filmsCount: 8,
      film,
    }
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            film={film}
          />
        </Provider>
        , {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
