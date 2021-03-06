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

it(`Click by Play button calls callback`, () => {
  const handlePlayButtonClick = jest.fn();
  const videoPlayer = mount(
      <FullVideoPlayer
        film={film}
        onItemLeaveHandler={noop}
        isPlaying={false}
        timer={`0`}
        progressBar={{left: `14px`}}
        onPlayClickHandler={handlePlayButtonClick}
        onFullScreenClickHandler={noop}
        progressValue={`0`}
      />);

  videoPlayer.find(`.player__play`).simulate(`click`);
  expect(handlePlayButtonClick).toHaveBeenCalledTimes(1);
});

it(`Click by Exit button calls callback`, () => {
  const handleExitButtonClick = jest.fn();
  const videoPlayer = mount(
      <FullVideoPlayer
        film={film}
        onItemLeaveHandler={handleExitButtonClick}
        isPlaying={false}
        timer={`0`}
        progressBar={{left: `14px`}}
        onPlayClickHandler={noop}
        onFullScreenClickHandler={noop}
        progressValue={`0`}
      />);

  videoPlayer.find(`.player__exit`).simulate(`click`);
  expect(handleExitButtonClick).toHaveBeenCalledTimes(1);
});

it(`Click by FullScreen button calls callback`, () => {
  const handleFullScreenButtonClick = jest.fn();
  const videoPlayer = mount(
      <FullVideoPlayer
        film={film}
        onItemLeaveHandler={noop}
        isPlaying={false}
        timer={`0`}
        progressBar={{left: `14px`}}
        onPlayClickHandler={noop}
        onFullScreenClickHandler={handleFullScreenButtonClick}
        progressValue={`0`}
      />);

  videoPlayer.find(`.player__full-screen`).simulate(`click`);
  expect(handleFullScreenButtonClick).toHaveBeenCalledTimes(1);
});
