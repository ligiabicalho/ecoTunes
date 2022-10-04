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
              <div key={ i }>
                <h1 data-testid="album-name">{music.collectionName}</h1>
                <h2 data-testid="artist-name">{music.artistName}</h2>
              </div>
            )
            : (
              <li key={ i }>
                {music.trackName}
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
