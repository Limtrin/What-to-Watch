import * as React from "react";

interface Props {
  isPlaying: boolean;
  image: string;
  src: string;
  name: string;
}

class VideoPlayer extends React.PureComponent<Props, {}> {
  private _videoRef: React.RefObject<HTMLVideoElement>;
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
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
        autoPlay
        poster={image}
      />
    );
  }
}

export default VideoPlayer;
