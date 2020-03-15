import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import FilmCard from '../film-card/film-card.jsx';
import {getMyListFilms} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import withVideo from '../../hocs/with-video/with-video.js';

const FilmCardWrapper = withVideo(FilmCard);

class MyList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loading();
  }

  render() {
    const {filmsList, onHeaderClickHandler, onFilmCardClickHandler, onItemEnterHandler, onItemLeaveHandler} = this.props;
    return filmsList && (
      <>
        <div className="user-page">
          <header className="page-header user-page__head">
            <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <h1 className="page-title user-page__title">My list</h1>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <div className="catalog__movies-list">
              {filmsList.map((item) => (
                <FilmCardWrapper
                  key={item.id}
                  film={item}
                  onHeaderClickHandler={onHeaderClickHandler}
                  onFilmCardClickHandler={onFilmCardClickHandler}
                  onCardMouseEnterHandler={onItemEnterHandler}
                  onCardMouseLeaveHandler={onItemLeaveHandler}
                />
              ))}
            </div>

          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

MyList.propTypes = {
  onFilmFavoriteStatusClickHandler: PropTypes.func.isRequired,
  filmsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
          rating: PropTypes.number.isRequired,
          date: PropTypes.string.isRequired,
          author: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
          }).isRequired,
          text: PropTypes.string.isRequired
        }).isRequired
    ),
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  })),
  onHeaderClickHandler: PropTypes.func.isRequired,
  onFilmCardClickHandler: PropTypes.func.isRequired,
  onItemEnterHandler: PropTypes.func,
  onItemLeaveHandler: PropTypes.func,
  loading: PropTypes.func,
  activeItem: PropTypes.any,
};

const mapStateToProps = (state) => ({
  filmsList: getMyListFilms(state)
});

const mapDispatchToProps = (dispatch) => ({
  loading() {
    dispatch(DataOperation.loadMyListFilms());
  }
});

export {MyList};

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
