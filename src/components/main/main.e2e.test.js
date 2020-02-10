import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

it(`Should header be pressed`, () => {
  const onHeaderClick = jest.fn();
  const filmsList = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

  const main = shallow(
      <Main
        filmName={`Grand Budapest`}
        filmGenre={`Drama`}
        filmYear={`1985`}
        filmsList={filmsList}
        onHeaderClickHandler={onHeaderClick}
      />
  );

  for (let i = 0; i < filmsList.length; i++) {
    main.find(`h3.small-movie-card__title`).at(i).simulate(`click`);
  }

  expect(onHeaderClick.mock.calls.length).toBe(3);
});
