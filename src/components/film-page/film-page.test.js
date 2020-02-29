import React from "react";
import renderer from "react-test-renderer";
import FilmPage from "./film-page.jsx";
import {film, filmsList} from "../../mocks/test-mocks.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

it(`<FilmPage /> should render correctly`, () => {
  const store = mockStore({
    genre: `All genres`,
    filmsList,
    filmsCurrent: filmsList
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <FilmPage
            film={film}
            filmsList={filmsList}
            onFilmCardClickHandler={() => {}}
            onHeaderClickHandler={() => {}}
            onItemEnterHandler={() => {}}
            onItemLeaveHandler={() => {}}
            activeItem={null}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
