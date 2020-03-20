import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withActiveTab from "./with-active-tab";

const TAB_NAME = {
  overview: `Overview`,
  details: `Details`,
  reviews: `Reviews`
};

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveTab(MockComponent);

it(`Should change ActiveTab`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.state().activeTab).toEqual(TAB_NAME.overview);

  wrapper.instance().activeTabHandler(TAB_NAME.details);
  expect(wrapper.state().activeTab).toEqual(TAB_NAME.details);

  wrapper.instance().activeTabHandler(TAB_NAME.reviews);
  expect(wrapper.state().activeTab).toEqual(TAB_NAME.reviews);
});
