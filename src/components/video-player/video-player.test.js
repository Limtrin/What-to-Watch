import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player.jsx";
import {film} from "../../mocks/test-mocks.js";

it(`<VideoPlayer /> should render correctly`, () => {
  const {name, image, preview} = film;
  const tree = renderer
    .create(
        <VideoPlayer
          name={name}
          image={image}
          src={preview}
          isPlaying={false}
        />, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
