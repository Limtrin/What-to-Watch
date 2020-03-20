import * as React from "react";
import * as Enzyme from "enzyme";
import {mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import App from "./app";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {AuthorizationStatus} from "../../reducer/user/user";
import NameSpace from "../../reducer/name-space";
import {filmsList, film} from "../../mocks/test-mocks";


Enzyme.configure({
  adapter: new Adapter()
});

const mockStore = configureStore([]);

it(`filmCardClickHandler calls onItemEnterHandler`, () => {
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

  const itemEnterHandler = jest.fn();

  const app = mount(
      <Provider store={store}>
        <BrowserRouter>
          <App
            onItemEnterHandler={itemEnterHandler}
          />
        </BrowserRouter>
      </Provider>
  ).find(App).children();

  app.instance().filmCardClickHandler(film);
  expect(itemEnterHandler.mock.calls.length).toBe(1);
});
