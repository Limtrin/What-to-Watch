import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const FilmCard = (props) => {
  const {film, onHeaderClickHandler, handleMouseEnter, handleMouseLeave, onFilmCardClickHandler, renderPlayer} = props;
  const {name, image, preview} = film;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        handleMouseEnter(film);
      }}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        onFilmCardClickHandler(film);
      }}
    >
      <div className="small-movie-card__image">
        {renderPlayer(name, image, preview)}
      </div>
      <h3
        onClick={onHeaderClickHandler}
        className="small-movie-card__title">
        <Link to={`/films/` + film.id} className="small-movie-card__link" href="movie-page.html">{name}</Link>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  onHeaderClickHandler: PropTypes.func.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  onFilmCardClickHandler: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default FilmCard;
