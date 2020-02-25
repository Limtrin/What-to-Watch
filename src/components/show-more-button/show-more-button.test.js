import React from "react";
import renderer from "react-test-renderer";
import {ShowMoreButton} from "./show-more-button.jsx";
import {filmsList} from "../../mocks/test-mocks.js";


it(`<ShowMoreButton /> should render correctly`, () => {
  const tree = renderer
    .create(
        <ShowMoreButton
          filmsCurrent={filmsList}
          filmsCount={8}
          onShowMoreButtonClick={() => {}}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
