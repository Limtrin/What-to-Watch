import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {Provider} from "react-redux";
import {filmsList, film} from "../../mocks/test-mocks.js";
import configureStore from "redux-mock-store";
import {BrowserRouter} from "react-router-dom";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

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
              onHeaderClickHandler={() => {}}
              onFilmCardClickHandler={() => {}}
              onItemEnterHandler={() => {}}
              onFilmFavoriteStatusClickHandler={() => {}}
              onItemLeaveHandler={() => {}}
              activeItem={null}
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
