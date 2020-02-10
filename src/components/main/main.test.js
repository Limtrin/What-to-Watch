import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

it(`Render Main`, () => {
  const main = renderer
    .create(
        <Main
          filmName={`Grand Budapest`}
          filmGenre={`Drama`}
          filmYear={`1985`}
          filmsList={[`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`]}
          onHeaderClickHandler={() => {}}
        />
    )
    .toJSON();

  expect(main).toMatchSnapshot();
});
