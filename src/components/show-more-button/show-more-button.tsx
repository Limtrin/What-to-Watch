import * as React from "react";
import {ActionCreator} from '../../reducer/data/data';
import {connect} from "react-redux";
import {getfilmCurrent, getFilmsCount} from "../../reducer/data/selectors";
import {FilmsType} from "../../types";

interface Props {
  filmsCurrent: FilmsType;
  filmsCount: number;
  onShowMoreButtonClick: () => void;
}

const ShowMoreButton: React.FunctionComponent<Props> = ({filmsCurrent, filmsCount, onShowMoreButtonClick}: Props) => {

  return filmsCurrent.length > filmsCount ? <div className="catalog__more">
    <button
      className="catalog__button"
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onShowMoreButtonClick();
      }}
    >Show more</button>
  </div> : null;
};

const mapStateToProps = (state) => ({
  filmsCurrent: getfilmCurrent(state),
  filmsCount: getFilmsCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick: () => {
    dispatch(ActionCreator.showMoreFilms());
  }
});

export {ShowMoreButton};
export default connect(mapStateToProps, mapDispatchToProps)(ShowMoreButton);
