import * as React from "react";
import {connect} from "react-redux";
import FilmCard from '../film-card/film-card';
import withVideo from '../../hocs/with-video/with-video';
import {getShowedFilms} from '../../reducer/data/selectors';
import {FilmsType} from "../../types";

const FilmCardWrapper = withVideo(FilmCard);

interface Props {
  filmsList: FilmsType;
  onFilmCardClickHandler: () => void;
  onItemEnterHandler: () => void;
  onItemLeaveHandler: () => void;
}

const FilmsList: React.FunctionComponent<Props> = (props: Props) => {
  const {onFilmCardClickHandler, onItemEnterHandler, onItemLeaveHandler} = props;

  return (
    <div className="catalog__movies-list">
      {props.filmsList.map((item) => (
        <FilmCardWrapper
          key={item.id}
          film={item}
          onFilmCardClickHandler={onFilmCardClickHandler}
          onCardMouseEnterHandler={onItemEnterHandler}
          onCardMouseLeaveHandler={onItemLeaveHandler}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  filmsList: getShowedFilms(state)
});

export {FilmsList};

export default connect(mapStateToProps)(FilmsList);
