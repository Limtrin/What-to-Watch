import * as React from "react";
import * as renderer from "react-test-renderer";
import Tabs from "./tabs";
import {film} from "../../mocks/test-mocks";

it(`Should <Tabs/> component render`, () => {
  const tree = renderer.create(<Tabs film={film} />).toJSON();

  expect(tree).toMatchSnapshot();
});
