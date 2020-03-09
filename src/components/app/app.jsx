import React from "react";
import Main from "../main/main.jsx";
import FilmPage from "../film-page/film-page.jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getPromFilm, getFilmsList} from "../../reducer/data/selectors.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {Operation as CommentsOperation} from "../../reducer/review/review.js";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import withRating from "../../hocs/with-rating/with-rating.js";

const FilmPageWrapped = withActiveItem(FilmPage);
const MainWrapped = withActiveItem(Main);
const AddReviewWrapped = withRating(AddReview);

const headerClickHandler = () => {};

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {chosenFilm: null};

    this._onFilmCardClickHandler = this._onFilmCardClickHandler.bind(this);
  }

  _onFilmCardClickHandler(film) {
    this.setState({chosenFilm: film});
  }

  _renderApp() {
    const {film, filmsList, authorizationStatus} = this.props;

    if (this.state.chosenFilm) {
      return (
        <FilmPageWrapped
          authorizationStatus={authorizationStatus}
          film={this.state.chosenFilm}
          filmsList={filmsList}
          onHeaderClickHandler={headerClickHandler}
          onFilmCardClickHandler={this._onFilmCardClickHandler}
        />
      );
    }

    return (
      <MainWrapped
        authorizationStatus={authorizationStatus}
        film={film}
        onHeaderClickHandler={headerClickHandler}
        onFilmCardClickHandler={this._onFilmCardClickHandler}
      />
    );
  }

  render() {
    const {login, authorizationStatus, sendComment} = this.props;
    return (
      <Switch>
        <Route exact path="/">
          {this._renderApp()}
        </Route>
        <Route exact path="/dev-review">
          <AddReviewWrapped
            filmId={1}
            onSubmit={sendComment}
          />
        </Route>
        <Route exact path="/auth-dev" render={() => {
          if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
            return <SignIn
              onSubmit={login}
            />;
          } else if (authorizationStatus === AuthorizationStatus.AUTH) {
            return this._renderApp();
          }
          return null;
        }} />
      </Switch>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  sendComment: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  film: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    genre: PropTypes.string,
    year: PropTypes.number,
    image: PropTypes.string,
    poster: PropTypes.string,
    cover: PropTypes.string,
    preview: PropTypes.string,
    time: PropTypes.string,
    rating: PropTypes.number,
    votes: PropTypes.number,
    director: PropTypes.string,
    description: PropTypes.string,
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
          rating: PropTypes.number.isRequired,
          date: PropTypes.string.isRequired,
          author: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
          }).isRequired,
          text: PropTypes.string.isRequired
        }).isRequired
    ),
    starring: PropTypes.arrayOf(PropTypes.string),
  }),
  filmsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
          rating: PropTypes.number.isRequired,
          date: PropTypes.string.isRequired,
          author: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
          }).isRequired,
          text: PropTypes.string.isRequired
        }).isRequired
    ),
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  filmsList: getFilmsList(state),
  film: getPromFilm(state)

});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  sendComment(authData, filmId) {
    dispatch(CommentsOperation.sendComment(authData, filmId));
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
