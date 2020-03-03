import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {Provider} from "react-redux";
import {filmsList, film} from "../../mocks/test-mocks.js";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

it(`Render Main`, () => {
  const store = mockStore({
    genre: `All genres`,
    filmsList,
    filmsCurrent: filmsList,
    showedFilms: filmsList
  });
  const main = renderer
    .create(
        <Provider store={store}>
          <Main
            film={film}
            onHeaderClickHandler={() => {}}
            onFilmCardClickHandler={() => {}}
            onItemEnterHandler={() => {}}
            onItemLeaveHandler={() => {}}
            activeItem={null}
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
