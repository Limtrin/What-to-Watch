import * as React from "react";
import {ActionCreator} from '../../reducer/review/review';
import {connect} from 'react-redux';
import {getText, getSendStatus, getFormBlock, getRating} from '../../reducer/review/selectors';
import {Link} from 'react-router-dom';
import {FilmInterface} from "../../types";

const MESSAGE_LIMIT = {
  min: 50,
  max: 400
};

interface State {
  rating: number;
}

interface Props {
  changeSendStatusText: (string: string) => void;
  changeRating: (rating: number) => void;
  updateNewCommentText: (string: string) => void;
  filmId: string;
  onSubmit: (authData: object, film: FilmInterface) => void;
  film: FilmInterface;
  textValue: string;
  sendStatusValue: string;
  formBlock: boolean;
  rating: number;
}


class AddReview extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  handleRatingChange(e) {
    this.props.changeRating(e.target.value);
  }

  handleChange(e) {
    switch (true) {
      case e.target.value.length < MESSAGE_LIMIT.min:
        this.props.changeSendStatusText(`Ваше сообщение менее 50 символов`);
        break;
      case e.target.value.length > MESSAGE_LIMIT.max:
        this.props.changeSendStatusText(`Ваше сообщение больше 400 символов`);
        break;
      default:
        this.props.changeSendStatusText(``);
    }

    this.props.updateNewCommentText(e.target.value);
  }

  handleSubmit(evt) {
    const {onSubmit, film} = this.props;

    evt.preventDefault();

    onSubmit({
      text: this.props.textValue,
      rating: this.props.rating * 2,
    }, film);
  }

  render() {
    const postDisabled = this.props.textValue.length < MESSAGE_LIMIT.min || this.props.textValue.length > MESSAGE_LIMIT.max;
    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={this.props.film.cover} alt={this.props.film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/films/${this.props.film.id}`} className="breadcrumbs__link">{this.props.film.name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <div className="user-block">
              <Link to="/mylist">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </Link>
            </div>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={this.props.film.poster} alt={this.props.film.name} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form
            action="#"
            className="add-review__form"
            onSubmit={(e) => {
              this.handleSubmit(e);
            }}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1"
                  onChange={(e) => {
                    this.handleRatingChange(e);
                  }}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2"
                  onChange={(e) => {
                    this.handleRatingChange(e);
                  }}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3"
                  onChange={(e) => {
                    this.handleRatingChange(e);
                  }}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4"
                  onChange={(e) => {
                    this.handleRatingChange(e);
                  }}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5"
                  onChange={(e) => {
                    this.handleRatingChange(e);
                  }}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Введите сообщение от 50 до 400 символов"
                value={this.props.textValue}
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
              <div className="add-review__submit">
                <div style={{margin: `0 auto`}}>{this.props.sendStatusValue}</div>
                {postDisabled || this.props.formBlock ? <button className="add-review__btn" type="submit" disabled>Post</button> : <button className="add-review__btn" type="submit">Post</button>}
              </div>

            </div>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    textValue: getText(state),
    sendStatusValue: getSendStatus(state),
    formBlock: getFormBlock(state),
    rating: getRating(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewCommentText: (text) => {
      dispatch(ActionCreator.updateNewCommentText(text));
    },
    changeSendStatusText: (text) => {
      dispatch(ActionCreator.changeSendStatusText(text));
    },
    changeRating: (rating) => {
      dispatch(ActionCreator.changeRating(rating));
    }
  };
};

export {AddReview};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
