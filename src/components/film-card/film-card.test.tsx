import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmCard from "./film-card";
import {film} from "../../mocks/test-mocks";
import {BrowserRouter} from "react-router-dom";
import {noop} from "../../utils";

it(`<FilmCard /> should render correctly`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <FilmCard
            film={film}
            onHandleMouseEnter={noop}
            onHandleMouseLeave={noop}
            onFilmCardClickHandler={noop}
            renderPlayer={() => null}
            isPlaying={false}
          />
        </BrowserRouter>
        , {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
