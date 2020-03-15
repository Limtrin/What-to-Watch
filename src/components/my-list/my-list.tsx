import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import FilmCard from '../film-card/film-card';
import {getMyListFilms} from "../../reducer/data/selectors";
import {Operation as DataOperation} from "../../reducer/data/data";
import withVideo from '../../hocs/with-video/with-video';
import {FilmsType, FilmType} from "../../types";

const FilmCardWrapper = withVideo(FilmCard);

interface Props {
  onFilmFavoriteStatusClickHandler: () => void;
  filmsList: FilmsType;
  onHeaderClickHandler: () => void;
  onFilmCardClickHandler: () => void;
  onItemEnterHandler: () => void;
  onItemLeaveHandler: () => void;
  loading: () => void;
  activeItem: FilmType;
}

class MyList extends React.PureComponent<Props> {
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
