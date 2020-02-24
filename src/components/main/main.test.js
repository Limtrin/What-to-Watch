import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {Provider} from "react-redux";
import {filmsList} from "../../mocks/test-mocks.js";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

it(`Render Main`, () => {
  const store = mockStore({
    genre: `All genres`,
    filmsList,
    filmsCurrent: filmsList
  });
  const main = renderer
    .create(
        <Provider store={store}>
          <Main
            filmName={`Grand Budapest`}
            filmGenre={`Drama`}
            filmYear={`1985`}
            filmsList={filmsList}
            onHeaderClickHandler={() => {}}
            onFilmCardClickHandler={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(main).toMatchSnapshot();
});
