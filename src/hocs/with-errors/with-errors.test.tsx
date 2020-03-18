import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withErrors from "./with-errors";
import {noop} from "../../utils";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withErrors(MockComponent);

it(`Should change loginError and passwordError`, () => {
  const wrapper = shallow(
      <MockComponentWrapped
        onSubmit={noop}
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

  wrapper.props().handleSubmit(falseLogin, falsePassword);
  expect(wrapper.state().loginError).toEqual(true);

  wrapper.props().handleSubmit(trueLogin, falsePassword);
  expect(wrapper.state().loginError).toEqual(false);
  expect(wrapper.state().passwordError).toEqual(true);

  wrapper.props().handleSubmit(trueLogin, truePassword);
  expect(wrapper.state().loginError).toEqual(false);
  expect(wrapper.state().passwordError).toEqual(false);
});
