import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from "react-redux";
import reducer from "./reducer/reducer";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducer/user/user";
import {Operation as DataOperation} from "./reducer/data/data";
import createAPI from "./api";
import thunk from "redux-thunk";
import withActiveItem from "./hocs/with-active-item/with-active-item";

const AppWrapped = withActiveItem(App);

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadPromoFilm());
store.dispatch(DataOperation.loadFilms());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <AppWrapped />
    </Provider>,
    document.querySelector(`#root`)
);
