import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withVideo from "./with-full-video";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withVideo(MockComponent);

it(`Should change isPlaying`, () => {
  const wrapper = shallow(
      <MockComponentWrapped
        film={film}
        onItemLeaveHandler={noop}
      />, {disableLifecycleMethods: true});

  const {_videoRef} = wrapper.instance();

  _videoRef.current = {
    play: noop,
    src: ``,
    pause: noop
  };

  wrapper.instance().componentDidMount();

  wrapper.instance().playClickHandler();
  expect(wrapper.state().isPlaying).toEqual(true);

  wrapper.instance().playClickHandler();
  expect(wrapper.state().isPlaying).toEqual(false);
});
