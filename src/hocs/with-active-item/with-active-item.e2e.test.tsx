import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withActiveItem from "./with-active-item";
import {film} from "../../mocks/test-mocks";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`Should change ActiveItem`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.state().activeItem).toEqual(null);

  wrapper.props().onItemEnterHandler(film);
  expect(wrapper.state().activeItem).toEqual(film);

  wrapper.props().onItemLeaveHandler(film);
  expect(wrapper.state().activeItem).toEqual(null);
});
