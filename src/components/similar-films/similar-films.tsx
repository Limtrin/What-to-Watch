import * as React from "react";
import {connect} from "react-redux";
import {FilmsList} from "../films-list/films-list";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {getFilmsList} from "../../reducer/data/selectors";
import {FilmsInterface, FilmInterface} from "../../types";

interface Props {
  film: FilmInterface;
  filmsList: FilmsInterface;
  onFilmCardClickHandler: () => void;
}

const FilmsListWrapped = withActiveItem(FilmsList);

const SimilarFilms: React.FunctionComponent<Props> = ({film, filmsList, onFilmCardClickHandler}: Props) => {

  const similarFilms = filmsList.filter((filmItem) => filmItem.genre === film.genre && filmItem.name !== film.name).slice(0, 4);

  return (
    <FilmsListWrapped
      onFilmCardClickHandler={onFilmCardClickHandler}
      filmsList={similarFilms}
    />
  );
};

const mapStateToProps = (state) => ({
  filmsList: getFilmsList(state),
});

export {SimilarFilms};

export default connect(mapStateToProps)(SimilarFilms);
