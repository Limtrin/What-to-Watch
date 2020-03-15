import * as React from "react";
import * as validator from "email-validator";

interface Props {
  onSubmit: (data: {login: string; password: string}) => void;
}

interface State {
  loginError: boolean;
  passwordError: boolean;
}

class SignIn extends React.PureComponent<Props, State> {
  private loginRef: React.RefObject<HTMLInputElement>;
  private passwordRef: React.RefObject<HTMLInputElement>;
  constructor(props) {
    super(props);

    this.state = {
      loginError: false,
      passwordError: false,
    };

    this.loginRef = React.createRef();
    this.passwordRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    if (!validator.validate(this.loginRef.current.value)) {
      this.setState({loginError: true});
      return;
    } else {
      this.setState({loginError: false});
    }

    if (this.passwordRef.current.value.length === 0) {
      this.setState({passwordError: true});
      return;
    } else {
      this.setState({passwordError: false});
    }

    onSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="" className="sign-in__form" onSubmit={this.handleSubmit}>
            <div className="sign-in__message">
              {this.state.passwordError && <p>We can’t recognize this email <br/> and password combination. Please try again.</p>}
              {this.state.loginError && <p>Please enter a valid email address</p>}
            </div>
            <div className="sign-in__fields">
              <div className={`sign-in__field ${this.state.loginError ? `sign-in__field--error` : null}`}>
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref={this.loginRef} />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={this.passwordRef}/>
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default SignIn;