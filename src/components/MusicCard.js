import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  state = {
    isFavorite: false,
  };

  componentDidMount() {
    const { favoriteCheck } = this.props;
    if (favoriteCheck) {
      this.setState({ isFavorite: true });
    }
  }

  render() {
    const { isFavorite } = this.state;
    const { trackName, trackId, previewUrl, handleChange } = this.props;
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
            checked={ isFavorite }
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
