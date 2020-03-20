import * as React from "react";
import {ActionCreator} from '../../reducer/data/data';
import {connect} from 'react-redux';
import {getGenres, getGenresList} from '../../reducer/data/selectors';

interface Props {
  currentGenre: string;
  genresList: string[];
  onGenreButtonClick: (genre: string) => void;
}

const GenresList: React.FunctionComponent<Props> = ({currentGenre, onGenreButtonClick, genresList}: Props) => {
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

const mapStateToProps = (state) => ({
  currentGenre: getGenres(state),
  genresList: getGenresList(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreButtonClick: (genre) => {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.changeFilmsCount(8));
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
