import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

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

it(`Render Main`, () => {
  const main = renderer
    .create(
        <Main
          filmName={`Grand Budapest`}
          filmGenre={`Drama`}
          filmYear={`1985`}
          filmsList={filmsList}
          onHeaderClickHandler={() => {}}
        />
    )
    .toJSON();

  expect(main).toMatchSnapshot();
});
