import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    loading: false,
    listFavorites: [],
  };

  async componentDidMount() {
    await this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({ loading: true });
    const listFavorites = await getFavoriteSongs();
    this.setState({
      listFavorites,
      loading: false,
    }); // , () => this.favoriteCheck()
  };

  handleChange = async ({ target: { id } }) => {
    const { listFavorites } = this.state;
    this.setState({ loading: true });
    const songCheck = listFavorites.find((fave) => fave.trackId === Number(id));
    await removeSong(songCheck);
    this.getFavorites();
  };

  favoriteCheck = (trackId) => {
    const { listFavorites } = this.state;
    if (listFavorites.length > 0) {
      return listFavorites.some((fave) => fave.trackId === trackId);
    } return false;
  };

  render() {
    const { loading, listFavorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading
          ? <Loading />
          : (
            <div data-testid="">
              <ul>
                {listFavorites.length > 0
                  ? listFavorites.map((favorite, i) => (
                    <li key={ i }>
                      <MusicCard
                        trackId={ favorite.trackId }
                        trackName={ favorite.trackName }
                        previewUrl={ favorite.previewUrl }
                        handleChange={ this.handleChange }
                        favoriteCheck={ this.favoriteCheck(favorite.trackId) }
                      />
                    </li>
                  ))
                  : <p>Não há músicas favoritas salvas.</p>}
              </ul>
            </div>
          )}
      </div>
    );
  }
}

// Favorites.propTypes = {
//   music: PropTypes.object,
// }.isRequired;

export default Favorites;
