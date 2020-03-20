import * as React from "react";
import * as renderer from "react-test-renderer";
import SignIn from "./sign-in";
import {noop} from "../../utils";
import {BrowserRouter} from "react-router-dom";

it(`Should render SignIn component`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <SignIn
            onHandleSubmit={noop}
            loginError={false}
            passwordError={false}
          />
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
