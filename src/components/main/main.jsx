import React from "react";
import PropTypes from "prop-types";
import FilmsList from "../films-list/films-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import FullVideoPlayer from "../full-video-player/full-video-player.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Link} from "react-router-dom";

const FilmsListWrapped = withActiveItem(FilmsList);
const GenresListWrapped = withActiveItem(GenresList);


const Main = (props) => {

  const {film, onHeaderClickHandler, onFilmCardClickHandler, onItemEnterHandler, onItemLeaveHandler, activeItem, authorizationStatus, onFilmFavoriteStatusClickHandler} = props;
  const {name: filmName, genre: filmGenre, year: filmYear, cover, poster} = film;

  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={cover} alt={filmName} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          {
            (authorizationStatus === AuthorizationStatus.AUTH) ?
              (<div className="user-block">
                <Link to="/mylist">
                  <div className="user-block__avatar">
                    <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                  </div>
                </Link>
              </div>) : (
                <div className="user-block"><Link to="/auth-dev">Sign In</Link></div>
              )
          }
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={poster} alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{filmName}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{filmGenre}</span>
                <span className="movie-card__year">{filmYear}</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresListWrapped />

          <FilmsListWrapped
            onHeaderClickHandler={onHeaderClickHandler}
            onFilmCardClickHandler={onFilmCardClickHandler}
          />

          <ShowMoreButton />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
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
    </>
  );
};

Main.propTypes = {
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
  onHeaderClickHandler: PropTypes.func.isRequired,
  onFilmCardClickHandler: PropTypes.func.isRequired,
  onItemEnterHandler: PropTypes.func,
  onItemLeaveHandler: PropTypes.func,
  activeItem: PropTypes.any,
};


export default Main;
