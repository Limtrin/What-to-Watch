import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmCard from "./film-card.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const film = {
  id: `we-need-to-talk-about-kevin`,
  name: `We need to talk about Kevin`,
  image: `img/we-need-to-talk-about-kevin.jpg`
};

it(`Should header be pressed`, () => {
  const onHeaderClick = jest.fn();

  const main = shallow(
      <FilmCard
        onCardMouseEnterHandler={() => {}}
        onCardMouseLeaveHandler={() => {}}
        film={film}
        onHeaderClickHandler={onHeaderClick}
      />
  );

  main.find(`h3.small-movie-card__title`).simulate(`click`);

  expect(onHeaderClick.mock.calls.length).toBe(1);
});

it(`HandlerOnMouseEnter get correct data`, () => {
  const onCardMouseEnter = jest.fn((...args) => [...args]);

  const filmCard = shallow(
      <FilmCard
        onCardMouseEnterHandler={onCardMouseEnter}
        onCardMouseLeaveHandler={() => {}}
        film={film}
        onHeaderClickHandler={() => {}}
      />
  );

  filmCard.find(`article`).simulate(`mouseEnter`);

  expect(onCardMouseEnter.mock.calls.length).toBe(1);
  expect(onCardMouseEnter.mock.calls[0][0]).toMatchObject(film);
});
