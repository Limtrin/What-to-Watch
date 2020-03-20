import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Tabs, {TAB_NAME} from "./tabs";
import {film} from "../../mocks/test-mocks";

configure({
  adapter: new Adapter()
});

it(`Should call handler on button click`, () => {
  const clickActiveTabHandler = jest.fn();

  const tabs = mount(
      <Tabs
        onActiveTabHandler={clickActiveTabHandler}
        activeTab={TAB_NAME.overview}
        film={film}
      />
  );

  tabs.find(`a.movie-nav__link`).at(0).simulate(`click`);
  tabs.find(`a.movie-nav__link`).at(1).simulate(`click`);
  tabs.find(`a.movie-nav__link`).at(2).simulate(`click`);

  expect(clickActiveTabHandler.mock.calls.length).toBe(3);
});
