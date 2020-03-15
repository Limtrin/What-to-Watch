import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withRatingForTest from "./with-rating";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";


configure({adapter: new Adapter()});
const mockStore = configureStore([]);

const MockComponent = () => <div />;
const MockComponentWrapped = withRatingForTest(MockComponent);

it(`Should change Rating`, () => {
  const store = mockStore({
    [NameSpace.REVIEW]: {
      text: ``,
      sendStatusMessage: ``,
      formBlock: false,
    }
  });
  const wrapper = mount(
      <Provider store={store}>
        <MockComponentWrapped />
      </Provider>
  ).children().children();

  const evt = {
    target: {
      value: 3,
    }
  };

  wrapper.instance().handleRatingChange(evt);
  expect(wrapper.state().rating).toEqual(3);
});
