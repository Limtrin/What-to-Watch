import {reducer, ActionCreator, ActionType, AuthorizationStatus} from "./user";


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    pending: true,
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    pending: true,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    pending: true,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
    pending: true,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    pending: true,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
    pending: true,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    pending: true,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    pending: true,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    pending: true,
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    pending: true,
  }, {
    type: ActionType.CHANGE_PANDING,
    payload: false,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    pending: false,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
    pending: false,
  }, {
    type: ActionType.CHANGE_PANDING,
    payload: true,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    pending: true,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });

  it(`Pending returns correct action`, () => {
    expect(ActionCreator.requirePending(false)).toEqual({
      type: ActionType.CHANGE_PANDING,
      payload: false,
    });

    expect(ActionCreator.requirePending(true)).toEqual({
      type: ActionType.CHANGE_PANDING,
      payload: true,
    });
  });
});

