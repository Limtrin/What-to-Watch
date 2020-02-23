import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";
import {film} from "../../mocks/test-mocks.js";

it(`Should <Tabs/> component render`, () => {
  const tree = renderer.create(<Tabs film={film} />).toJSON();

  expect(tree).toMatchSnapshot();
});
