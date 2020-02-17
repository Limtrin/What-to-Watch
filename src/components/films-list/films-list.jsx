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
    cover: PropTypes.string.isRequired
  })).isRequired,
  onHeaderClickHandler: PropTypes.func.isRequired,
  onFilmCardClickHandler: PropTypes.func.isRequired
};

export default FilmsList;
