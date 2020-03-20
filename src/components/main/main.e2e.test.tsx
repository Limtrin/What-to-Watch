import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Main from "./main";
import {AuthorizationStatus} from "../../reducer/user/user";
import {noop} from "../../utils";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import {filmsList, film} from "../../mocks/test-mocks";
import configureStore from "redux-mock-store";

configure({
  adapter: new Adapter()
});

const mockStore = configureStore([]);

it(`Should call handler on list click`, () => {
  const clickFavoriteStatusHandler = jest.fn();

  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH
    },
    [NameSpace.DATA]: {
      genre: `All genres`,
      filmsList,
      filmsCurrent: filmsList,
      showedFilms: filmsList.slice(0, 8),
      filmsCount: 8,
      film,
    }
  });

  const main = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Main
            authorizationStatus={AuthorizationStatus.AUTH}
            film={film}
            onFilmCardClickHandler={noop}
            onFilmFavoriteStatusClickHandler={clickFavoriteStatusHandler}
          />
        </BrowserRouter>
      </Provider>
  );

  main.find(`button.btn--list`).simulate(`click`);

  expect(clickFavoriteStatusHandler.mock.calls.length).toBe(1);
});
