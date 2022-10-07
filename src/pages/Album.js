import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  /* Limpar LocalStorage no console: localStorage.setItem('favorite_songs', JSON.stringify([])); */
  state = {
    allMusics: [],
    loading: true,
    listFavorites: [],
  };

  async componentDidMount() {
    await this.handleGetMusics();
    await this.handleGetFavoriteSongs();
  }

  handleGetMusics = async () => {
    const { match: { params: { id } } } = this.props; // props nativas do Route, permite pegar o parâmetro :id do path.
    this.setState({
      allMusics: await getMusics(id),
      loading: false,
    });
  };

  handleGetFavoriteSongs = async () => {
    this.setState({ loading: true });
    const listFavorites = await getFavoriteSongs(); // resgata as músicas salvas e atualiza no state.
    this.setState({
      listFavorites,
      loading: false,
    });
  };

  handleFavoriteCheck = (trackId) => { // favoriteCheck(t.trackId)
    const { listFavorites } = this.state;
    return listFavorites.some((fave) => fave.trackId === trackId);
  };

  handleChange = async ({ target }) => {
    const { allMusics } = this.state;
    const { trackId, checked } = target;
    const songCheck = allMusics.find((music) => music.trackId === trackId);
    this.setState({ loading: true });
    if (checked) {
      await addSong(songCheck);
    } else {
      await removeSong(songCheck);
    }
    this.handleGetFavoriteSongs();
  };

  render() {
    const { allMusics, loading } = this.state;
    return (
      <>
        <Header />
        {
          loading
            ? <Loading />
            : (
              <div data-testid="page-album">
                <ul>
                  {allMusics.map((music, i) => (
                    i === 0 // 1º Obj não é uma música, então exibe o título.
                      ? (
                        <div key={ i }>
                          <h1 data-testid="album-name">{music.collectionName}</h1>
                          <h2 data-testid="artist-name">{music.artistName}</h2>
                        </div>
                      )
                      : (
                        <li key={ i }>
                          <MusicCard
                            trackId={ music.trackId }
                            trackName={ music.trackName }
                            previewUrl={ music.previewUrl }
                            handleChange={ () => this.handleChange }
                            favoriteCheck={ this.handleFavoriteCheck(music.trackId) }
                          />
                        </li>
                      )
                  ))}
                </ul>
              </div>
            )
        }
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf,
  }),
}.isRequired;

export default Album;
