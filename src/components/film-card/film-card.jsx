import React from 'react';
import PropTypes from 'prop-types';

const FilmCard = ({film, onHeaderClickHandler, onCardMouseEnterHandler, onCardMouseLeaveHandler}) => {

  const {name, image} = film;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        onCardMouseEnterHandler(film);
      }}
      onMouseLeave={onCardMouseLeaveHandler}
    >
      <div className="small-movie-card__image">
        <img src={image} alt={name} width="280" height="175" />
      </div>
      <h3
        onClick={onHeaderClickHandler}
        className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  onHeaderClickHandler: PropTypes.func.isRequired,
  onCardMouseEnterHandler: PropTypes.func.isRequired,
  onCardMouseLeaveHandler: PropTypes.func.isRequired,
};

export default FilmCard;
