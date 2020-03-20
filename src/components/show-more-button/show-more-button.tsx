import * as React from "react";
import {ActionCreator} from '../../reducer/data/data';
import {connect} from "react-redux";
import {getfilmsCurrent, getFilmsCount} from "../../reducer/data/selectors";
import {FilmsInterface} from "../../types";

interface Props {
  filmsCurrent: FilmsInterface;
  filmsCount: number;
  onShowMoreButtonClick: (filmsCount: number) => void;
}

const ShowMoreButton: React.FunctionComponent<Props> = ({filmsCurrent, filmsCount, onShowMoreButtonClick}: Props) => {

  return filmsCurrent.length > filmsCount ? <div className="catalog__more">
    <button
      className="catalog__button"
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onShowMoreButtonClick(filmsCount);
      }}
    >Show more</button>
  </div> : null;
};

const mapStateToProps = (state) => ({
  filmsCurrent: getfilmsCurrent(state),
  filmsCount: getFilmsCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick: (filmsCount) => {
    dispatch(ActionCreator.changeFilmsCount(filmsCount + 8));
  }
});

export {ShowMoreButton};
export default connect(mapStateToProps, mapDispatchToProps)(ShowMoreButton);
