import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {AddReview} from "./add-review";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {noop} from "../../utils";
import {film} from "../../mocks/test-mocks";
import {BrowserRouter} from "react-router-dom";

configure({adapter: new Adapter()});
const mockStore = configureStore([]);

it(`Should call Submit`, () => {
  const store = mockStore({
    [NameSpace.REVIEW]: {
      text: ``,
      sendStatusMessage: ``,
      formBlock: false,
      rating: 5,
    }
  });

  const submitHandler = jest.fn();

  const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AddReview
            filmId={`1`}
            onSubmit={submitHandler}
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
      </Provider>
  );

  wrapper.find(`form.add-review__form`).simulate(`submit`);
  expect(submitHandler.mock.calls.length).toBe(1);

});


it(`Should change Rating`, () => {
  const store = mockStore({
    [NameSpace.REVIEW]: {
      text: ``,
      sendStatusMessage: ``,
      formBlock: false,
      rating: 5,
    }
  });

  const changeRatingHandler = jest.fn();

  const wrapper = mount(
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
            changeRating={changeRatingHandler}
          />
        </BrowserRouter>
      </Provider>
  );

  wrapper.find(`input.rating__input`).at(0).simulate(`change`);
  wrapper.find(`input.rating__input`).at(1).simulate(`change`);
  wrapper.find(`input.rating__input`).at(2).simulate(`change`);
  wrapper.find(`input.rating__input`).at(3).simulate(`change`);
  wrapper.find(`input.rating__input`).at(4).simulate(`change`);
  expect(changeRatingHandler.mock.calls.length).toBe(5);

});


it(`Should change textarea`, () => {
  const store = mockStore({
    [NameSpace.REVIEW]: {
      text: ``,
      sendStatusMessage: ``,
      formBlock: false,
      rating: 5,
    }
  });

  const changeSendStatusHandler = jest.fn();
  const updateNewCommentTextHandler = jest.fn();

  const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AddReview
            filmId={`1`}
            onSubmit={noop}
            film={film}
            formBlock={true}
            updateNewCommentText={updateNewCommentTextHandler}
            textValue={``}
            sendStatusValue={``}
            changeSendStatusText={changeSendStatusHandler}
            rating={5}
            changeRating={noop}
          />
        </BrowserRouter>
      </Provider>
  );


  wrapper.find(`textarea.add-review__textarea`).simulate(`change`);
  expect(updateNewCommentTextHandler.mock.calls.length).toBe(1);
  expect(changeSendStatusHandler.mock.calls.length).toBe(1);

});
