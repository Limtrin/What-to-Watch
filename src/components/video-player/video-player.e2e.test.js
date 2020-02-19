import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";
import {film} from "../../mocks/test-mocks.js";

Enzyme.configure({
  adapter: new Adapter()
});

const {name, image, preview} = film;

it(`Should change state isPlaying`, () => {
  const videoPlayerWrapper = (isPlaying) => {
    return mount(
        <VideoPlayer
          name={name}
          image={image}
          src={preview}
          isPlaying={isPlaying}
        />
    );
  };

  expect(videoPlayerWrapper(true).state(`isPlaying`)).toBe(true);
  expect(videoPlayerWrapper(false).state(`isPlaying`)).toBe(false);
});
