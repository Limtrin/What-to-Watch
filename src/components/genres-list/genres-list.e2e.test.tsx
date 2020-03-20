import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {GenresList} from "./genres-list";

configure({
  adapter: new Adapter()
});

it(`Should call handler on genre click`, () => {
  const clickGenreButtonHandler = jest.fn();

  const genres = mount(
      <GenresList
        onGenreButtonClick={clickGenreButtonHandler}
        currentGenre={`All genres`}
        genresList={[`All genres`, `Documentary`]}
      />
  );

  genres.find(`a.catalog__genres-link`).at(0).simulate(`click`);
  genres.find(`a.catalog__genres-link`).at(1).simulate(`click`);

  expect(clickGenreButtonHandler.mock.calls.length).toBe(2);
});
