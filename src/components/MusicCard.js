import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
/* Limpar LocalStorage no console: localStorage.setItem('favorite_songs', JSON.stringify([])); */
  state = {
    loading: false,
    listFavorites: [],
    // favorite: '',
  };

  componentDidMount() {
    this.handleGetFavoriteSongs(); // Quais situações essa função é executada???
  }

  handleGetFavoriteSongs = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs(); // resgata as músicas salvas e atualiza no state.
    this.setState({
      listFavorites: favorites,
      loading: false,
    }, () => this.handleHasFavorite());
  };

  handleHasFavorite = () => {
    const { music } = this.props;
    const { listFavorites } = this.state;
    return listFavorites.some(
      (favorita) => favorita.trackId === music.trackId,
    ); // retorna true se a música estiver salva nos favoritos -> altera o checked;
  };

  handleCheckboxFavorite = async ({ target }) => {
    const { music, upFavorite } = this.props;
    this.setState(
      { loading: true,
        [target.name]: target.checked }, // ainda não sei se vou usar isso aqui
    );
    if (this.handleHasFavorite()) {
      await removeSong(music);
    } else {
      await addSong(music); // se FALSE, addSong
    }
    this.setState({ loading: false });
    this.handleGetFavoriteSongs();
    upFavorite();
  };

  render() {
    const { music } = this.props;
    const { loading } = this.state;
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
            name="favorite"
            id={ music.trackId }
            // value -> por padrão retorna on/unchecked, ou caso receba um valor, retorna valor/unchecked;
            checked={ this.handleHasFavorite() } // Este atributo qndo presente marca por padrão o checkbox(true), não demanda um valor. Pode passar uma função com retorno true/false pra dentro do checked; -> QUANDO ESSA FUNÇÃO É CHAMADA?
            onChange={ this.handleCheckboxFavorite }
          />
          Favorita
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.object,
}.isRequired;

export default MusicCard;
