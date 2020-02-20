import React from 'react';
import PropTypes from 'prop-types';
import FilmCard from '../film-card/film-card.jsx';

class FilmsList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {activeCard: null};
    this._onCardMouseEnterHandler = this._onCardMouseEnterHandler.bind(this);
    this._onCardMouseLeaveHandler = this._onCardMouseLeaveHandler.bind(this);
  }

  _onCardMouseEnterHandler(item) {
    this.setState({
      activeCard: item
    });
  }

  _onCardMouseLeaveHandler() {
    this.setState({
      activeCard: null
    });
  }

  render() {
    return (
      <div className="catalog__movies-list">
        {this.props.filmsList.map((item) => (
          <FilmCard
            key={item.id}
            film={item}
            onHeaderClickHandler={this.props.onHeaderClickHandler}
            onFilmCardClickHandler={this.props.onFilmCardClickHandler}
            onCardMouseEnterHandler={this._onCardMouseEnterHandler}
            onCardMouseLeaveHandler={this._onCardMouseLeaveHandler}
          />
        ))}
      </div>
    );
  }
}

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
  onFilmCardClickHandler: PropTypes.func.isRequired
};

export default FilmsList;
