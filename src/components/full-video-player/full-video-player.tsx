import * as React from "react";
import {FilmInterface} from "../../types";
import history from "../../history";

interface Props {
  film: FilmInterface;
  onItemLeaveHandler: () => void;
  isPlaying: boolean;
  timer: string;
  progressBar: React.CSSProperties;
  onPlayClickHandler: () => void;
  onFullScreenClickHandler: () => void;
  progressValue: string;
}

class FullVideoPlayer extends React.PureComponent<Props, {}> {
  render() {
    const {progressBar, timer, isPlaying, film, onItemLeaveHandler, onPlayClickHandler, onFullScreenClickHandler, progressValue, children} = this.props;
    return (
      <div className="player" style={{zIndex: 10}}>

        {children}

        <button
          onClick={() => {
            onItemLeaveHandler();
            history.goBack();
          }}
          type="button"
          className="player__exit"
        >Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={progressValue} max="100"></progress>
              <div className="player__toggler" style={progressBar}>Toggler</div>
            </div>
            <div className="player__time-value">{timer}</div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
              onClick={onPlayClickHandler}
            >
              {!isPlaying ? (
              <><svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span></>
              ) : (
              <><svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg><span>Pause</span></>)}
            </button>
            <div className="player__name">{film.name}</div>

            <button
              onClick={onFullScreenClickHandler}
              type="button"
              className="player__full-screen"
            >
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FullVideoPlayer;
