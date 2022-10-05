import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    checked: false,
  };

  componentDidMount() { // Requisição
    this.handleGetFavoriteSongs();
  }

  handleGetFavoriteSongs = async () => {
    const { music } = this.props;
    this.setState({ loading: true });
    const favoritas = await getFavoriteSongs();
    // ao receber as favoritas, verifica se alguma corresponde a musica do card, se TRUE altera o checked.
    favoritas.some(
      (favorita) => (favorita.trackId === music.trackId
        && this.setState({ checked: true })),
    );
    this.setState({
      loading: false,
      savedFavoritas: favoritas,
    });
  };

  handleCheckFavorite = async ({ target }) => {
    const { music } = this.props;
    this.setState({ loading: true });
    await addSong(music);
    this.setState({
      loading: false,
      checked: target.checked });
  };

  render() {
    const { music } = this.props;
    const { loading, checked } = this.state;
    return (
      <>
        {loading && <Loading />}
        {/* Organização do código e pages Album e Music Card para o Requisito 9 */}
        <p>{music.trackName}</p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ music.trackId }
          data-testid={ `checkbox-music-${music.trackId}` }
        >
          <input
            type="checkbox"
            id={ music.trackId }
            checked={ checked }
            onChange={ this.handleCheckFavorite }
          />
          Favorita
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.object,
}.isRequired;

export default MusicCard;
