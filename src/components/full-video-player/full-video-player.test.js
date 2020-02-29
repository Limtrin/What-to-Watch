import React from "react";
import renderer from "react-test-renderer";
import FullVideoPlayer from "./full-video-player.jsx";
import {film} from "../../mocks/test-mocks.js";

it(`<FullVideoPlayer /> should render correctly`, () => {
  const tree = renderer
    .create(
        <FullVideoPlayer
          film={film}
          onItemLeaveHandler={() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
