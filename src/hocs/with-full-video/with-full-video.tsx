import * as React from "react";
import {FilmType} from "../../types";

interface Props {
  film: FilmType;
  onItemLeaveHandler: () => void;
}

interface State {
  isPlaying: boolean;
  progress: number;
  progressValue: number;
}

const withFullVideo = (Component) => {
  class WithFullVideoPlayer extends React.PureComponent<Props, State> {
    private _videoRef: React.RefObject<HTMLVideoElement>;
    constructor(props) {
      super(props);

      this._videoRef = React.createRef();

      this.state = {
        isPlaying: false,
        progress: 0,
        progressValue: 0
      };

      this.onPlayClickHandler = this.onPlayClickHandler.bind(this);
      this.onFullScreenClickHandler = this.onFullScreenClickHandler.bind(this);
    }

    play() {
      const video = this._videoRef.current;

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    onPlayClickHandler() {
      this.setState({isPlaying: !this.state.isPlaying}, this.play);
    }


    onFullScreenClickHandler() {
      const video = this._videoRef.current;
      video.requestFullscreen();
    }

    componentDidMount() {
      const video = this._videoRef.current;

      video.src = this.props.film.preview;

      video.onended = () => {
        video.pause();
      };

      video.onpause = () => {
        this.setState({
          isPlaying: false,
        });
      };

      video.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      video.ontimeupdate = () => this.setState({
        progress: Math.floor(video.duration - video.currentTime),
        progressValue: (100 / video.duration) * video.currentTime,
      });
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.src = ``;
      video.ontimeupdate = null;
      video.onended = null;
      video.onplay = null;
      video.onpause = null;
    }

    render() {
      const timer = this.state.progress ? `0:00:${(this.state.progress < 10) ? `0` + this.state.progress : this.state.progress}` : `0:00:00`;
      const progressBar = {
        left: this.state.progressValue + `%`,
      };
      const progressValue = this.state.progressValue ? this.state.progressValue : `0`;

      return (
        <Component
          {...this.props}
          progressBar={progressBar}
          timer={timer}
          isPlaying={this.state.isPlaying}
          onFullScreenClickHandler={this.onFullScreenClickHandler}
          onPlayClickHandler={this.onPlayClickHandler}
          progressValue={progressValue}
        >
          <video
            ref={this._videoRef}
            className="player__video"
            poster={this.props.film.poster}
            autoPlay
          />
        </Component>
      );
    }
  }

  return WithFullVideoPlayer;
};


export default withFullVideo;
