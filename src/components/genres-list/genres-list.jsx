import React from 'react';
import PropTypes from 'prop-types';
import genres from '../../mocks/genres';
import {ActionCreator} from '../../reducer/data/data.js';
import {connect} from 'react-redux';
import {getGenres} from '../../reducer/data/selectors';

const GenresList = ({currentGenre, onGenreButtonClick}) => {
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, i) => {
        return (
          <li key={`${i}-${genre.title}`} className={`catalog__genres-item ${currentGenre === genre ? `catalog__genres-item--active` : ``}`}>
            <a
              href="#"
              className="catalog__genres-link"
              onClick={(e) => {
                e.preventDefault();
                onGenreButtonClick(genre.genre);
              }}
            >
              {genre.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

GenresList.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  onGenreButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: getGenres(state)
});

const mapDispatchToProps = (dispatch) => ({
  onGenreButtonClick: (genre) => {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.changeFilmsList());
    dispatch(ActionCreator.resetFilmsCount());
    dispatch(ActionCreator.showMoreFilms());
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
