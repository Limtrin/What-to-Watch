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
          isPlaying={false}
          timer={`0`}
          progressBar={{left: `14px`}}
          onPlayClickHandler={noop}
          onFullScreenClickHandler={noop}
          progressValue={`0`}
        >
          <video />
        </FullVideoPlayer>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
