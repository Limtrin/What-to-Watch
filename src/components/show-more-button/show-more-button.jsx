import React from "react";
import PropTypes from "prop-types";
import {ActionCreator} from '../../reducer/data/data.js';
import {connect} from "react-redux";
import {getfilmCurrent, getFilmsCount} from "../../reducer/data/selectors.js";

const ShowMoreButton = ({filmsCurrent, filmsCount, onShowMoreButtonClick}) => {

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

ShowMoreButton.propTypes = {
  filmsCurrent: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired
  })).isRequired,
  filmsCount: PropTypes.number,
  onShowMoreButtonClick: PropTypes.func.isRequired,
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
