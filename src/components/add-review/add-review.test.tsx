import * as React from "react";
import * as renderer from "react-test-renderer";
import AddReview from "./add-review";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`Render AddReview`, () => {
  const store = mockStore({
    [NameSpace.REVIEW]: {
      text: ``,
      sendStatusMessage: ``,
      formBlock: false,
      rating: 5,
    }
  });

  const addReview = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <AddReview
              filmId={`1`}
              onSubmit={noop}
              film={film}
              formBlock={true}
              updateNewCommentText={noop}
              textValue={``}
              sendStatusValue={``}
              changeSendStatusText={noop}
              rating={5}
              changeRating={noop}
            />
          </BrowserRouter>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(addReview).toMatchSnapshot();
});
