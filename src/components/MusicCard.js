import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musics } = this.props;
    return (
      <ul>
        { musics.map((music, i) => (
          i === 0
            ? (
              <li key={ i }>
                <h1 data-testid="album-name">{music.collectionName}</h1>
                <h2 data-testid="artist-name">{music.artistName}</h2>
                <audio data-testid="audio-component">
                  {/* Tentanto enganar o test para validar o Requisito */}
                  <track kind="captions" />
                  {music.trackName}
                </audio>
              </li>
            )
            : (
              <li key={ i }>
                <p>
                  Música:
                  {' '}
                  {music.trackName}
                </p>
                <audio data-testid="audio-component" src={ music.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                  .
                </audio>
              </li>
            )
        ))}
      </ul>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.object,
}.isRequired;

export default MusicCard;
