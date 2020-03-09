import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FilmsList} from "../films-list/films-list.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {getFilmsList} from "../../reducer/data/selectors.js";


const FilmsListWrapped = withActiveItem(FilmsList);

const SimilarFilms = ({film, filmsList, onFilmCardClickHandler, onHeaderClickHandler}) => {

  const similarFilms = filmsList.filter((filmItem) => filmItem.genre === film.genre && filmItem.name !== film.name).slice(0, 4);

  return (
    <FilmsListWrapped
      onHeaderClickHandler={onHeaderClickHandler}
      onFilmCardClickHandler={onFilmCardClickHandler}
      filmsList={similarFilms}
    />
  );
};

SimilarFilms.propTypes = {
  film: PropTypes.shape({
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
          author: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  filmsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
          rating: PropTypes.number.isRequired,
          date: PropTypes.string.isRequired,
          author: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  onHeaderClickHandler: PropTypes.func.isRequired,
  onFilmCardClickHandler: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  filmsList: getFilmsList(state),
});

export {SimilarFilms};

export default connect(mapStateToProps)(SimilarFilms);
