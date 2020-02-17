import React from "react";
import renderer from "react-test-renderer";
import FilmsList from "./films-list.jsx";

const filmsList = [
  {
    id: `bohemian-rhapsody`,
    name: `Bohemian Rhapsody`,
    image: `img/bohemian-rhapsody.jpg`
  },
  {
    id: `aviator`,
    name: `Aviator`,
    image: `img/aviator.jpg`
  }
];

it(`<FilmsList /> should render correctly`, () => {
  const tree = renderer
    .create(
        <FilmsList
          filmsList={filmsList}
          onHeaderClickHandler = {() => {}}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
