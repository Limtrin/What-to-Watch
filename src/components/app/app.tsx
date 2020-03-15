import React from "react";
import Main from "../main/main.jsx";
import FilmPage from "../film-page/film-page.jsx";
import PropTypes from "prop-types";
import {Route, Switch} from "react-router-dom";
import FullVideoPlayer from "../full-video-player/full-video-player.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {Operation as CommentsOperation} from "../../reducer/review/review.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import withRating from "../../hocs/with-rating/with-rating.js";
import {Router} from "react-router-dom";
import history from "../../history.js";
import MyList from "../my-list/my-list.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getPromFilm, getFilmsList} from "../../reducer/data/selectors.js";

const MyListWrapped = withActiveItem(MyList);
const AddReviewWrapped = withRating(AddReview);

const headerClickHandler = () => {};

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      chosenFilm: null,
      currentFilm: null
    };

    this._onFilmCardClickHandler = this._onFilmCardClickHandler.bind(this);
  }

  _onFilmCardClickHandler(film) {
    this.setState({chosenFilm: film});
    history.push(`/films/${film.id}`);
  }

  render() {
    const {film, filmsList, authorizationStatus, changeFavoriteStatus, login, sendComment, onItemLeaveHandler} = this.props;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Main
              authorizationStatus={authorizationStatus}
              film={film}
              onHeaderClickHandler={headerClickHandler}
              onFilmCardClickHandler={this._onFilmCardClickHandler}
              onFilmFavoriteStatusClickHandler={changeFavoriteStatus}
            />
          </Route>
          <PrivateRoute
            exact
            path="/mylist"
            render={() => {
              return (
                <MyListWrapped
                  authorizationStatus={authorizationStatus}
                  film={film}
                  onHeaderClickHandler={headerClickHandler}
                  onFilmCardClickHandler={this._onFilmCardClickHandler}
                  onFilmFavoriteStatusClickHandler={changeFavoriteStatus}
                />
              );
            }}
          />
          <Route exact path="/login" render={(props) => {
            return (authorizationStatus === AuthorizationStatus.AUTH) ?
              props.history.goBack() :
              <SignIn onSubmit={login} />;
          }} />
          <Route exact path="/films/:id" render={(props) => {
            const chosenFilm = filmsList.find((item) => item.id === props.match.params.id);
            return chosenFilm && <FilmPage
              authorizationStatus={authorizationStatus}
              film={chosenFilm}
              filmsList={filmsList}
              onHeaderClickHandler={headerClickHandler}
              onFilmCardClickHandler={this._onFilmCardClickHandler}
              onFilmFavoriteStatusClickHandler={changeFavoriteStatus}
            />;
          }} />
          <Route exact path="/films/:id/player" render={(props) => {
            const chosenFilm = filmsList.find((item) => item.id === props.match.params.id);
            return chosenFilm && <FullVideoPlayer
              film={chosenFilm}
              onItemLeaveHandler={onItemLeaveHandler}
            />;
          }} />
          <PrivateRoute
            exact
            path="/films/:id/review"
            render={(props) => {
              const chosenFilm = filmsList.find((item) => item.id === props.match.params.id);
              return chosenFilm && (
                <AddReviewWrapped
                  filmId={props.match.params.id}
                  onSubmit={sendComment}
                  film={chosenFilm}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  changeFavoriteStatus: PropTypes.func.isRequired,
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
  })).isRequired,
  loading: PropTypes.func,
  onItemLeaveHandler: PropTypes.func,
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
  changeFavoriteStatus(filmId, status) {
    dispatch(DataOperation.changeFavoriteStatus(filmId, status));
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
