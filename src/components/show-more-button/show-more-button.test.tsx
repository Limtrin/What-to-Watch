import * as React from "react";
import * as renderer from "react-test-renderer";
import {ShowMoreButton} from "./show-more-button";
import {filmsList} from "../../mocks/test-mocks";
import {noop} from "../../utils";


it(`<ShowMoreButton /> should render correctly`, () => {
  const tree = renderer
    .create(
        <ShowMoreButton
          filmsCurrent={filmsList}
          filmsCount={1}
          onShowMoreButtonClick={noop}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
