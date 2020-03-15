import * as React from "react";
import * as Enzyme from "enzyme";
import {mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player";
import {film} from "../../mocks/test-mocks";

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
