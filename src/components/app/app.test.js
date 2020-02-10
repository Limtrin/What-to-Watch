import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

it(`Render App`, () => {
  const tree = renderer
    .create(
        <App
          filmName={`Grand Budapest`}
          filmGenre={`Drama`}
          filmYear={`1985`}
          filmsList={[`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`]}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
