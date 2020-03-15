import * as React from "react";
import * as renderer from "react-test-renderer";
import {GenresList} from "./genres-list";
import {noop} from "../../utils";

it(`<GenreList /> should render correctly`, () => {
  const tree = renderer
    .create(
        <GenresList
          currentGenre={`All genres`}
          onGenreButtonClick={noop}
          genresList={[`All grenres`, `Thriller`]}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
