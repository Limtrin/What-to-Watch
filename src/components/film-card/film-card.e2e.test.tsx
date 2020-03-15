import * as React from "react";
import * as Enzyme from "enzyme";
import {shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import FilmCard from "./film-card";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils";

Enzyme.configure({
  adapter: new Adapter()
});

it(`HandleMouseEnter get correct data`, () => {
  const onCardMouseEnter = jest.fn((...args) => [...args]);

  const filmCard = shallow(
      <FilmCard
        handleMouseEnter={onCardMouseEnter}
        handleMouseLeave={noop}
        film={film}
        onFilmCardClickHandler={noop}
        renderPlayer={noop}
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
        handleMouseEnter={noop}
        handleMouseLeave={noop}
        film={film}
        onFilmCardClickHandler={onFilmCardClick}
        renderPlayer={() => null}
      />
  );

  main.find(`article`).simulate(`click`);

  expect(onFilmCardClick.mock.calls.length).toBe(1);
  expect(onFilmCardClick.mock.calls[0][0]).toMatchObject(film);
});
