import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withErrors from "./with-errors";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withErrors(MockComponent);

it(`Should change loginError and passwordError and onSubmit call`, () => {

  const onSubmitHandler = jest.fn();

  const wrapper = shallow(
      <MockComponentWrapped
        onSubmit={onSubmitHandler}
      />
  );

  const falseLogin = {
    current: {
      value: `sasha`
    }
  };

  const trueLogin = {
    current: {
      value: `sasha@bk.ru`
    }
  };

  const falsePassword = {
    current: {
      value: ``
    }
  };

  const truePassword = {
    current: {
      value: `sasha92`
    }
  };

  expect(wrapper.state().loginError).toEqual(false);

  wrapper.props().onHandleSubmit(falseLogin, falsePassword);
  expect(wrapper.state().loginError).toEqual(true);
  expect(wrapper.state().passwordError).toEqual(false);
  expect(onSubmitHandler.mock.calls.length).toBe(0);

  wrapper.props().onHandleSubmit(trueLogin, falsePassword);
  expect(wrapper.state().loginError).toEqual(false);
  expect(wrapper.state().passwordError).toEqual(true);
  expect(onSubmitHandler.mock.calls.length).toBe(0);

  wrapper.props().onHandleSubmit(trueLogin, truePassword);
  expect(wrapper.state().loginError).toEqual(false);
  expect(wrapper.state().passwordError).toEqual(false);
  expect(onSubmitHandler.mock.calls.length).toBe(1);
});
