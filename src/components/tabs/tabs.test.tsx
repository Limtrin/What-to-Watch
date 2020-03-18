import * as React from "react";
import * as renderer from "react-test-renderer";
import Tabs, {TAB_NAME} from "./tabs";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils";


it(`Should <Tabs/> component render`, () => {
  const tree = renderer
    .create(
        <Tabs
          onItemLeaveHandler={noop}
          onItemEnterHandler={noop}
          activeItem={TAB_NAME.overview}
          film={film}
        />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
