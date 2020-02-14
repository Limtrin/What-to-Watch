import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card.jsx";

const film = {
  id: `we-need-to-talk-about-kevin`,
  name: `We need to talk about Kevin`,
  image: `img/we-need-to-talk-about-kevin.jpg`
};

it(`<FilmCard /> should render correctly`, () => {
  const tree = renderer
    .create(
        <FilmCard
          film={film}
          onCardMouseEnterHandler={() => {}}
          onCardMouseLeaveHandler={() => {}}
          onHeaderClickHandler={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
