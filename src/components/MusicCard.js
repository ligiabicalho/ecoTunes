import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
  };

  handleCheckFavorite = async ({ target: { id } }) => {
    const { musics } = this.props;
    this.setState({ loading: true });
    await addSong(musics[id]);
    this.setState({ loading: false });
  };

  render() {
    const { musics } = this.props;
    const { loading } = this.state;
    return (
      <>
        <ul>
          { musics.map((music, i) => (
            i === 0 // 1º Obj não é uma música, então exibe o título.
              ? (
                <div key={ i }>
                  <h1 data-testid="album-name">{music.collectionName}</h1>
                  <h2 data-testid="artist-name">{music.artistName}</h2>
                </div>
              )
              : (
                <li key={ i }>
                  <p>{music.trackName}</p>
                  <audio data-testid="audio-component" src={ music.previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                    .
                  </audio>
                  <label
                    htmlFor={ i }
                    data-testid={ `checkbox-music-${music.trackId}` }
                  >
                    <input
                      type="checkbox"
                      id={ i }
                      name="favorite"
                      onChange={ this.handleCheckFavorite }
                    />
                    Favorita
                  </label>
                </li>
              )
          ))}
        </ul>
        {loading && <Loading />}
      </>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.object,
}.isRequired;

export default MusicCard;
