import * as React from "react";
import * as renderer from "react-test-renderer";
import AddReview from "./add-review";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils";
import {BrowserRouter} from "react-router-dom";

it(`Render AddReview`, () => {
  const addReview = renderer
    .create(
        <BrowserRouter>
          <AddReview
            filmId={`1`}
            onSubmit={noop}
            film={film}
            handleChange={noop}
            handleRatingChange={noop}
            handleSubmit={noop}
            formBlock={true}
            updateNewCommentText={noop}
            textValue={``}
            sendStatusValue={``}
          />
        </BrowserRouter>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(addReview).toMatchSnapshot();
});
