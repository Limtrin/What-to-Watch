import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilmCard from "./film-card.jsx";
import {film} from "../../mocks/test-mocks.js";

Enzyme.configure({
  adapter: new Adapter()
});

it(`Should header be pressed`, () => {
  const onHeaderClick = jest.fn();

  const main = shallow(
      <FilmCard
        onCardMouseEnterHandler={() => {}}
        onCardMouseLeaveHandler={() => {}}
        film={film}
        onHeaderClickHandler={onHeaderClick}
        onFilmCardClickHandler={() => {}}
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
        onFilmCardClickHandler={() => {}}
      />
  );

  filmCard.find(`article`).simulate(`mouseEnter`);

  expect(onCardMouseEnter.mock.calls.length).toBe(1);
  expect(onCardMouseEnter.mock.calls[0][0]).toMatchObject(film);
});

it(`Should film card be pressed`, () => {
  const onFilmCardClick = jest.fn((...args) => [...args]);

  const main = shallow(
      <FilmCard
        onCardMouseEnterHandler={() => {}}
        onCardMouseLeaveHandler={() => {}}
        film={film}
        onHeaderClickHandler={() => {}}
        onFilmCardClickHandler={onFilmCardClick}
      />
  );

  main.find(`article`).simulate(`click`);

  expect(onFilmCardClick.mock.calls.length).toBe(1);
  expect(onFilmCardClick.mock.calls[0][0]).toMatchObject(film);
});
