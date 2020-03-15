import * as React from "react";
import * as renderer from "react-test-renderer";
import {MyList} from "./my-list";
import {filmsList} from "../../mocks/test-mocks";
import {BrowserRouter} from "react-router-dom";
import {noop} from "../../utils";

it(`Render MyList`, () => {
  const main = renderer
    .create(
        <BrowserRouter >
          <MyList
            onFilmCardClickHandler={noop}
            onFilmFavoriteStatusClickHandler={noop}
            onHeaderClickHandler={noop}
            loading={noop}
            onItemEnterHandler={noop}
            onItemLeaveHandler={noop}
            filmsList={filmsList}
            activeItem={null}
          />
        </BrowserRouter>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(main).toMatchSnapshot();
});
