import React from "react";
import renderer from "react-test-renderer";
import {GenresList} from "./genres-list.jsx";

it(`<GenreList /> should render correctly`, () => {
  const tree = renderer
    .create(
        <GenresList
          currentGenre={`All genres`}
          onGenreButtonClick={() => {}}
          genresList={[`All grenres`, `Thriller`]}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
