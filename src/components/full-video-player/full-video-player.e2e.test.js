import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FullVideoPlayer from "./full-video-player.jsx";
import {film} from "../../mocks/test-mocks.js";

Enzyme.configure({
  adapter: new Adapter()
});

it(`Should change state isPlaying`, () => {
  const videoPlayer = mount(
      <FullVideoPlayer
        film={film}
        onItemLeaveHandler={() => {}}
      />);

  window.HTMLMediaElement.prototype.pause = () => {};

  const {_videoRef} = videoPlayer.instance();

  jest.spyOn(_videoRef.current, `pause`);

  videoPlayer.instance().componentDidMount();

  videoPlayer.find(`button.player__play`).simulate(`click`);

  expect(videoPlayer.state(`isPlaying`)).toBe(false);
});
