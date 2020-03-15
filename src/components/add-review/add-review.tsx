import * as React from "react";
import {Link} from 'react-router-dom';
import {FilmType} from "../../types";

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleRatingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onSubmit: () => void;
  filmId: string;
  updateNewCommentText: () => void;
  textValue: string;
  sendStatusValue: string;
  formBlock: boolean;
  film: FilmType;
}

const AddReview: React.FunctionComponent<Props> = (props: Props) => {
  const postDisabled = props.textValue.length < 40 || props.textValue.length > 400;
  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={props.film.cover} alt={props.film.name} />
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
                <Link to={`/films/${props.film.id}`} className="breadcrumbs__link">{props.film.name}</Link>
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
          <img src={props.film.poster} alt={props.film.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form
          action="#"
          className="add-review__form"
          onSubmit={(e) => {
            props.handleSubmit(e);
          }}>
          <div className="rating">
            <div className="rating__stars">
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1"
                onChange={(e) => {
                  props.handleRatingChange(e);
                }}/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2"
                onChange={(e) => {
                  props.handleRatingChange(e);
                }}/>
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3"
                onChange={(e) => {
                  props.handleRatingChange(e);
                }}/>
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4"
                onChange={(e) => {
                  props.handleRatingChange(e);
                }}/>
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5"
                onChange={(e) => {
                  props.handleRatingChange(e);
                }}/>
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              value={props.textValue}
              onChange={(e) => {
                props.handleChange(e);
              }}
            />
            <div className="add-review__submit">
              <div style={{margin: `0 auto`}}>{props.sendStatusValue}</div>
              {postDisabled || props.formBlock ? <button className="add-review__btn" type="submit" disabled>Post</button> : <button className="add-review__btn" type="submit">Post</button>}
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};

export default AddReview;
