import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withVideo from "./with-video";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withVideo(MockComponent);

it(`Should change withVideo`, () => {
  const wrapper = shallow(
      <MockComponentWrapped
        film={film}
        onHeaderClickHandler={noop}
        onFilmCardClickHandler={noop}
        onCardMouseEnterHandler={noop}
        onCardMouseLeaveHandler={noop}
      />);

  wrapper.instance().handleMouseEnter(film);
  setTimeout(() => {
    expect(wrapper.state().isPlaying).toEqual(true);
  }, 1000);

  wrapper.instance().handleMouseLeave();
  expect(wrapper.state().isPlaying).toEqual(false);
});
