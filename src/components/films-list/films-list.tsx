import * as React from "react";
import {connect} from "react-redux";
import FilmCard from '../film-card/film-card';
import withVideo from '../../hocs/with-video/with-video';
import {getfilmsCurrent, getFilmsCount} from '../../reducer/data/selectors';
import {FilmsInterface} from "../../types";

const FilmCardWrapper = withVideo(FilmCard);

interface Props {
  filmsList: FilmsInterface;
  onFilmCardClickHandler: () => void;
  onItemEnterHandler: () => void;
  onItemLeaveHandler: () => void;
  filmsCount: number;
}

const FilmsList: React.FunctionComponent<Props> = (props: Props) => {
  const {onFilmCardClickHandler, onItemEnterHandler, onItemLeaveHandler, filmsList, filmsCount} = props;

  return (
    <div className="catalog__movies-list">
      {filmsList.slice(0, filmsCount).map((item) => (
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
  filmsList: getfilmsCurrent(state),
  filmsCount: getFilmsCount(state),
});

export {FilmsList};

export default connect(mapStateToProps)(FilmsList);
