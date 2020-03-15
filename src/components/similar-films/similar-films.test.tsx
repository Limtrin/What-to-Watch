import * as React from "react";
import * as renderer from "react-test-renderer";
import SimilarFIlms from "./similar-films";
import {filmsList, film} from "../../mocks/test-mocks";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {noop} from "../../utils";

const mockStore = configureStore([]);

it(`Should render SimilarFilms component`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      genre: `All genres`,
      filmsList,
      filmsCurrent: filmsList
    }
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <SimilarFIlms
            film={film}
            onFilmCardClickHandler={noop}
            onHeaderClickHandler={noop}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
