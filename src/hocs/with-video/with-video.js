import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../../components/video-player/video-player.jsx';

const withVideo = (Component) => {
  class WithVideo extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    componentWillUnmount() {
      clearTimeout(this.timeoutOnMouseOver);
    }

    handleMouseEnter(film) {
      this.props.onCardMouseEnterHandler(film);
      this.timeoutOnMouseOver = setTimeout(() => {
        this.setState({isPlaying: true});
      }, 1000);
    }

    handleMouseLeave() {
      this.props.onCardMouseLeaveHandler();
      this.setState({isPlaying: false});
      clearTimeout(this.timeoutOnMouseOver);
    }

    render() {
      return (
        <Component
          {...this.props}
          handleMouseEnter={this.handleMouseEnter}
          handleMouseLeave={this.handleMouseLeave}
          renderPlayer={(name, image, src) => {
            return (
              <VideoPlayer
                name={name}
                image={image}
                src={src}
                isPlaying={this.state.isPlaying}
              />
            );
          }}
        />
      );
    }
  }
  WithVideo.propTypes = {
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

  return WithVideo;
};


export default withVideo;
