import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, trackId, previewUrl, handleChange, favoriteCheck } = this.props;
    return (
      <>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ trackId }
          data-testid={ `checkbox-music-${trackId}` }
        >
          <input
            type="checkbox"
            id={ trackId }
            checked={ favoriteCheck }
            onChange={ handleChange }
          />
          Favorita
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  trackId: PropTypes.number,
  previewUrl: PropTypes.string,
  handleChange: PropTypes.func,
  favoriteCheck: PropTypes.func,
}.isRequired;

export default MusicCard;
