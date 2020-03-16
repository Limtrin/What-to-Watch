import * as React from "react";
import {Subtract} from "utility-types";
import VideoPlayer from '../../components/video-player/video-player';

interface State {
  isPlaying: boolean;
}

interface InjectingProps {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  renderPlayer: (name: string, image: string, src: string) => React.ReactNode;
  isPlaying: boolean;
}

const withVideo = (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithVideo extends React.PureComponent<T, State> {
    private timeoutOnMouseOver: ReturnType<typeof setTimeout>;

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
          isPlaying={this.state.isPlaying}
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

  return WithVideo;
};


export default withVideo;
