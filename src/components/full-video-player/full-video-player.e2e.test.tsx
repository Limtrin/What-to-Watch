import * as React from "react";
import * as Enzyme from "enzyme";
import {mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import FullVideoPlayer from "./full-video-player";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils";

Enzyme.configure({
  adapter: new Adapter()
});

it(`Should change state isPlaying`, () => {
  const videoPlayer = mount(
      <FullVideoPlayer
        film={film}
        onItemLeaveHandler={noop}
      />);

  window.HTMLMediaElement.prototype.play = noop;

  const {_videoRef} = videoPlayer.instance();

  jest.spyOn(_videoRef.current, `play`);

  videoPlayer.instance().componentDidMount();

  videoPlayer.find(`button.player__play`).simulate(`click`);

  expect(videoPlayer.state(`isPlaying`)).toBe(true);
});
