import React from "react";
import PropTypes from "prop-types";

class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
    this.state = {
      isPlaying: this.props.isPlaying
    };
  }

  componentDidMount() {
    const {src} = this.props;
    const video = this._videoRef.current;

    video.src = src;
    video.muted = true;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.src = ``;
    video.muted = false;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }

  render() {
    const {image, src} = this.props;
    return (
      <video
        src={src}
        ref={this._videoRef}
        width="280"
        height="175"
        onLoadStart={() => this.setState({
          isPlaying: false
        })}
        onPlay={() => this.setState({
          isPlaying: true,
        })}
        poster={image}
      />
    );
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default VideoPlayer;
