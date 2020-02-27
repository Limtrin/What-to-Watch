import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVideo from "./with-video.js";
import {film} from "../../mocks/test-mocks.js";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withVideo(MockComponent);

it(`Should change withVideo`, () => {
  const wrapper = shallow(
      <MockComponentWrapped
        film={film}
        onHeaderClickHandler={() => {}}
        onFilmCardClickHandler={() => {}}
        onCardMouseEnterHandler={() => {}}
        onCardMouseLeaveHandler={() => {}}
      />);

  wrapper.instance().handleMouseEnter(film);
  setTimeout(() => {
    expect(wrapper.state().isPlaying).toEqual(true);
  }, 1000);

  wrapper.instance().handleMouseLeave();
  expect(wrapper.state().isPlaying).toEqual(false);
});
