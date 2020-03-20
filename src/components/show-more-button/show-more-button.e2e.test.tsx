import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {ShowMoreButton} from "./show-more-button";
import {filmsList} from "../../mocks/test-mocks";

configure({
  adapter: new Adapter()
});

it(`Should call handler on button click`, () => {
  const showMoreButtonClickHandler = jest.fn();

  const showMoreButton = mount(
      <ShowMoreButton
        filmsCurrent={filmsList}
        filmsCount={1}
        onShowMoreButtonClick={showMoreButtonClickHandler}
      />
  );

  showMoreButton.find(`button.catalog__button`).simulate(`click`);

  expect(showMoreButtonClickHandler.mock.calls.length).toBe(1);
});
