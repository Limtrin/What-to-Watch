import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';

class FilmCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutOnMouseOver);
  }

  render() {
    const {film, onHeaderClickHandler, onCardMouseEnterHandler, onCardMouseLeaveHandler, onFilmCardClickHandler} = this.props;
    const {name, image, preview} = film;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={() => {
          onCardMouseEnterHandler(film);
          this.timeoutOnMouseOver = setTimeout(() => {
            this.setState({isPlaying: true});
          }, 1000);
        }}
        onMouseLeave={() => {
          onCardMouseLeaveHandler();
          this.setState({isPlaying: false});
          clearTimeout(this.timeoutOnMouseOver);
        }}
        onClick={() => {
          onFilmCardClickHandler(film);
        }}
      >
        <div className="small-movie-card__image">
          <VideoPlayer
            name={name}
            image={image}
            src={preview}
            isPlaying={this.state.isPlaying}
          />
        </div>
        <h3
          onClick={onHeaderClickHandler}
          className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{name}</a>
        </h3>
      </article>
    );
  }
}

FilmCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  onHeaderClickHandler: PropTypes.func.isRequired,
  onCardMouseEnterHandler: PropTypes.func.isRequired,
  onCardMouseLeaveHandler: PropTypes.func.isRequired,
  onFilmCardClickHandler: PropTypes.func.isRequired
};

export default FilmCard;
