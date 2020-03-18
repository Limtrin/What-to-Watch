import * as React from "react";
import * as renderer from "react-test-renderer";
import SignIn from "./sign-in";
import {noop} from "../../utils";

it(`Should render SignIn component`, () => {
  const tree = renderer
    .create(
        <SignIn
          handleSubmit={noop}
          loginError={false}
          passwordError={false}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
