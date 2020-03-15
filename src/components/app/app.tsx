import * as React from "react";
import Main from "../main/main";
import FilmPage from "../film-page/film-page";
import {Route, Switch, Router} from "react-router-dom";
import FullVideoPlayer from "../full-video-player/full-video-player";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user";
import {Operation as CommentsOperation} from "../../reducer/review/review";
import {Operation as DataOperation} from "../../reducer/data/data";
import SignIn from "../sign-in/sign-in";
import AddReview from "../add-review/add-review";
import withRating from "../../hocs/with-rating/with-rating";
import history from "../../history";
import MyList from "../my-list/my-list";
import PrivateRoute from "../private-route/private-route";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {getPromFilm, getFilmsList} from "../../reducer/data/selectors";
import {FilmType, FilmsType} from "../../types";

const MyListWrapped = withActiveItem(MyList);
const AddReviewWrapped = withRating(AddReview);

interface Props {
  authorizationStatus: string;
  changeFavoriteStatus: () => void;
  sendComment: () => void;
  login: () => void;
  film: FilmType;
  filmsList: FilmsType;
  loading: () => void;
  onItemLeaveHandler: () => void;
}

class App extends React.PureComponent<Props, {}> {
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
