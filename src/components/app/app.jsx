import React from "react";
import Main from "../main/main.jsx";
import FilmPage from "../film-page/film-page.jsx";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";

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
    const {filmName, filmGenre, filmYear, filmsList} = this.props;

    if (this.state.chosenFilm) {
      return (
        <FilmPage film={this.state.chosenFilm} />
      );
    }

    return (
      <Main
        filmName={filmName}
        filmGenre={filmGenre}
        filmYear={filmYear}
        filmsList={filmsList}
        onHeaderClickHandler={headerClickHandler}
        onFilmCardClickHandler={this._onFilmCardClickHandler}
      />
    );
  }

  render() {
    const {filmsList} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <FilmPage film={filmsList[0]}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  filmName: PropTypes.string.isRequired,
  filmGenre: PropTypes.string.isRequired,
  filmYear: PropTypes.string.isRequired,
  filmsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  })).isRequired
};

export default App;
