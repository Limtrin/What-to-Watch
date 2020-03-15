import React from 'react';
import PropTypes from 'prop-types';
import {ActionCreator} from '../../reducer/data/data.js';
import {connect} from 'react-redux';
import {getGenres, getGenresList} from '../../reducer/data/selectors';

const GenresList = ({currentGenre, onGenreButtonClick, genresList}) => {
  return (
    <ul className="catalog__genres-list">
      {genresList.map((genre) => {
        return (
          <li key={`${genre}`} className={`catalog__genres-item ${currentGenre === genre ? `catalog__genres-item--active` : ``}`}>
            <a
              href="#"
              className="catalog__genres-link"
              onClick={(e) => {
                e.preventDefault();
                onGenreButtonClick(genre);
              }}
            >
              {genre}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

GenresList.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  genresList: PropTypes.array.isRequired,
  onGenreButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: getGenres(state),
  genresList: getGenresList(state),
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
