import * as React from "react";
import Tabs from '../tabs/tabs';
import SimilarFilms from '../similar-films/similar-films';
import {AuthorizationStatus} from '../../reducer/user/user';
import {Link} from 'react-router-dom';
import {FilmsType, FilmType} from "../../types";

interface Props {
  authorizationStatus: string;
  onFilmFavoriteStatusClickHandler: (id: string, status: number) => void;
  film: FilmType;
  filmsList: FilmsType;
  onFilmCardClickHandler: (film: FilmType | null) => void;
}

const FilmPage: React.FunctionComponent<Props> = (props: Props) => {
  const {film, filmsList, onFilmCardClickHandler, authorizationStatus, onFilmFavoriteStatusClickHandler} = props;
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
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
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
                  <div className="user-block"><Link to="/login">Sign In</Link></div>
                )
            }
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{film.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{film.genre}</span>
                <span className="movie-card__year">{film.year}</span>
              </p>

              <div className="movie-card__buttons">
                <Link
                  to={`/films/${film.id}/player`}
                  className="btn btn--play movie-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                {authorizationStatus === AuthorizationStatus.AUTH ?
                <>
                  <button
                    className="btn btn--list movie-card__button"
                    type="button"
                    onClick={() => {
                      onFilmFavoriteStatusClickHandler(film.id, +!film.favorite);
                    }}
                  >
                    {!film.favorite ?
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg> :
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                    }
                    <span>My list</span>
                  </button>
                  <Link to={`/films/${film.id}/review`} className="btn movie-card__button">Add review</Link>
                </> :
                <>
                  <Link
                    to="/login"
                    className="btn btn--list movie-card__button"
                    type="button"
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </Link>
                  <Link to={`/login`} className="btn movie-card__button">Add review</Link>
                </>
                }
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
    </React.Fragment >
  );
};

export default FilmPage;
