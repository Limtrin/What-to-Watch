import * as React from "react";
import * as renderer from "react-test-renderer";
import FullVideoPlayer from "./full-video-player";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils";

it(`<FullVideoPlayer /> should render correctly`, () => {
  const tree = renderer
    .create(
        <FullVideoPlayer
          film={film}
          onItemLeaveHandler={noop}
        />, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
