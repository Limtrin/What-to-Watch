import * as React from "react";
import {Link} from 'react-router-dom';
import {FilmInterface} from "../../types";

interface Props {
  film: FilmInterface;
  onHandleMouseEnter: (film: FilmInterface) => void;
  onHandleMouseLeave: () => void;
  onFilmCardClickHandler: (film: FilmInterface) => void;
  renderPlayer: (name: string, image: string, preview: string) => React.ReactNode;
  isPlaying: boolean;
}

const FilmCard: React.FunctionComponent<Props> = (props: Props) => {
  const {film, onHandleMouseEnter, onHandleMouseLeave, onFilmCardClickHandler, renderPlayer, isPlaying} = props;
  const {name, image, preview} = film;
  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        onHandleMouseEnter(film);
      }}
      onMouseLeave={onHandleMouseLeave}
      onClick={() => {
        onFilmCardClickHandler(film);
      }}
    >
      <div className="small-movie-card__image">
        {isPlaying ?
          renderPlayer(name, image, preview) :
          <img src={image} alt={name} width="280" height="175"></img>
        }
      </div>
      <h3
        className="small-movie-card__title">
        <Link to={`/films/` + film.id} className="small-movie-card__link">{name}</Link>
      </h3>
    </article>
  );
};

export default FilmCard;
