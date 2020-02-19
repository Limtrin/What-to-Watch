import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {filmsList} from "../../mocks/test-mocks.js";

it(`Render App`, () => {
  const tree = renderer
    .create(
        <App
          filmName={`Grand Budapest`}
          filmGenre={`Drama`}
          filmYear={`1985`}
          filmsList={filmsList}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
