import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from '../video-player/video-player.jsx';

class FilmItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    };
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleMouseOut = this._handleMouseOut.bind(this);
    this._timeOut = null;
  }

  componentWillUnmount() {
    clearTimeout(this._timeOut);
  }

  render() {
    const {
      item,
      onClick
    } = this.props;
    const {
      title,
      picture,
      src
    } = item;
    const {isPlaying} = this.state;

    // Формирование превью отображения карточки фильма
    const preview = isPlaying ?
      <VideoPlayer
        src={src}
        isPlaying={isPlaying}
      /> :
      <img src={picture} alt={title} width="280" height="175" />;

    return <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image" onMouseOver={() => this._handleMouseOver(item)} onMouseOut={this._handleMouseOut}>
        {preview}
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html" onClick={(event) => {
          event.preventDefault(); onClick(item);
        }}>{title}</a>
      </h3>
    </article>;
  }

  _handleMouseOver(item) {
    this.props.onHover(item);
    this._timeOut = setTimeout(() => {
      if (this._timeOut) {
        this.setState({
          isPlaying: true
        });
      }
    }, 1000);
  }

  _handleMouseOut() {
    clearTimeout(this._timeOut);
    this.setState({
      isPlaying: false
    });
  }
}

export const itemShape = PropTypes.shape({
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  description: PropTypes.string,
  director: PropTypes.string,
  genre: PropTypes.string,
  id: PropTypes.number,
  isFavorite: PropTypes.bool,
  title: PropTypes.string,
  posterImage: PropTypes.string,
  picture: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  rating: PropTypes.number,
  released: PropTypes.number,
  runTime: PropTypes.number,
  scoresCount: PropTypes.number,
  starring: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  videoLink: PropTypes.string
});

FilmItem.propTypes = {
  item: itemShape.isRequired,
  onClick: PropTypes.func,
  onHover: PropTypes.func
};

export default FilmItem;
