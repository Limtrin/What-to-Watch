import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {filmsList} from "../../mocks/test-mocks.js";

it(`Render Main`, () => {
  const main = renderer
    .create(
        <Main
          filmName={`Grand Budapest`}
          filmGenre={`Drama`}
          filmYear={`1985`}
          filmsList={filmsList}
          onHeaderClickHandler={() => {}}
          onFilmCardClickHandler={() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(main).toMatchSnapshot();
});
