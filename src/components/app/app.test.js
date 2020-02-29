import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {filmsList, film} from "../../mocks/test-mocks.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    genre: `All genres`,
    filmsList,
    filmsCurrent: filmsList,
    showedFilms: filmsList.slice(0, 8),
    filmsCount: 8,
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
