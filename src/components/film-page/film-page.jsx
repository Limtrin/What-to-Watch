import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../tabs/tabs.jsx';
import SimilarFilms from '../similar-films/similar-films.jsx';
import FullVideoPlayer from "../full-video-player/full-video-player.jsx";

const FilmPage = ({film, filmsList, onHeaderClickHandler, onFilmCardClickHandler, onItemEnterHandler, onItemLeaveHandler, activeItem, authorizationStatus, onFilmFavoriteStatusClickHandler}) => {
  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={film.cover} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{film.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{film.genre}</span>
                <span className="movie-card__year">{film.year}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  onClick={() => {
                    onItemEnterHandler(film);
                  }}
                  className="btn btn--play movie-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list movie-card__button"
                  type="button"
                  onClick={() => {
                    onFilmFavoriteStatusClickHandler(film.id, +!film.favorite);
                  }}
                >
                  {film.favorite ?
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg> :
                    <svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"></use>
                    </svg>
                  }
                  <span>My list</span>
                </button>
                { authorizationStatus === `AUTH` ? <a href="/login" className="btn movie-card__button">Add review</a> : null }
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={film.poster} alt={film.name} width="218" height="327" />
            </div>

            <Tabs
              film={film}
            />

          </div>
        </div>
      </section >

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <SimilarFilms
            film={film}
            filmsList={filmsList}
            onHeaderClickHandler={onHeaderClickHandler}
            onFilmCardClickHandler={onFilmCardClickHandler}
          />
        </section>

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
      {activeItem && (<FullVideoPlayer film={film} onItemLeaveHandler={onItemLeaveHandler}/>)}
    </React.Fragment >
  );
};

export default FilmPage;

FilmPage.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  onFilmFavoriteStatusClickHandler: PropTypes.func.isRequired,
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
    favorite: PropTypes.bool,
  }),
  filmsList: PropTypes.arrayOf(
      PropTypes.shape({
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
        favorite: PropTypes.bool,
      }).isRequired
  ),
  onHeaderClickHandler: PropTypes.func,
  onFilmCardClickHandler: PropTypes.func,
  onItemEnterHandler: PropTypes.func,
  onItemLeaveHandler: PropTypes.func,
  activeItem: PropTypes.any,
};
