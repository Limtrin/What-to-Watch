import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import FilmCard from '../film-card/film-card.jsx';
import withVideo from '../../hocs/with-video/with-video.js';

const FilmCardWrapper = withVideo(FilmCard);

const FilmsList = (props) => {
  const {onHeaderClickHandler, onFilmCardClickHandler, onItemEnterHandler, onItemLeaveHandler} = props;

  return (
    <div className="catalog__movies-list">
      {props.filmsList.map((item) => (
        <FilmCardWrapper
          key={item.id}
          film={item}
          onHeaderClickHandler={onHeaderClickHandler}
          onFilmCardClickHandler={onFilmCardClickHandler}
          onCardMouseEnterHandler={onItemEnterHandler}
          onCardMouseLeaveHandler={onItemLeaveHandler}
        />
      ))}
    </div>
  );
};

FilmsList.propTypes = {
  filmsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
          rating: PropTypes.number.isRequired,
          date: PropTypes.string.isRequired,
          author: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  onHeaderClickHandler: PropTypes.func.isRequired,
  onFilmCardClickHandler: PropTypes.func.isRequired,
  onItemEnterHandler: PropTypes.func.isRequired,
  onItemLeaveHandler: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filmsList: state.showedFilms
});

export {FilmsList};

export default connect(mapStateToProps)(FilmsList);
