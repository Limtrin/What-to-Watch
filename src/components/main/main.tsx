import * as React from "react";
import FilmsList from "../films-list/films-list";
import GenresList from "../genres-list/genres-list";
import ShowMoreButton from "../show-more-button/show-more-button";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Link} from "react-router-dom";
import {FilmType} from "../../types";

const FilmsListWrapped = withActiveItem(FilmsList);
const GenresListWrapped = withActiveItem(GenresList);

interface Props {
  authorizationStatus: string;
  onFilmFavoriteStatusClickHandler: (id: string, status: number) => void;
  film: FilmType;
  onFilmCardClickHandler: (film: FilmType | null) => void;
}

const Main: React.FunctionComponent<Props> = (props: Props) => {

  const {film, onFilmCardClickHandler, authorizationStatus, onFilmFavoriteStatusClickHandler} = props;
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
                <div className="user-block"><Link to="/login">Sign In</Link></div>
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
                  </>
                }
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
    </>
  );
};

export default Main;
