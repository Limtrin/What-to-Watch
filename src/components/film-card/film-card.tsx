import * as React from "react";
import {Link} from 'react-router-dom';
import {FilmType} from "../../types";

interface Props {
  film: FilmType;
  handleMouseEnter: (film: FilmType) => void;
  handleMouseLeave: () => void;
  onFilmCardClickHandler: (film: FilmType) => void;
  renderPlayer: (name: string, image: string, preview: string) => React.ReactNode;
}

const FilmCard: React.FunctionComponent<Props> = (props: Props) => {
  const {film, handleMouseEnter, handleMouseLeave, onFilmCardClickHandler, renderPlayer} = props;
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
        className="small-movie-card__title">
        <Link to={`/films/` + film.id} className="small-movie-card__link" href="movie-page.html">{name}</Link>
      </h3>
    </article>
  );
};

export default FilmCard;
