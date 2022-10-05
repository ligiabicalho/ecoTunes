import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
    const favorites = await getFavoriteSongs();
    this.setState({
      listFavorites: favorites,
      loading: false,
    } /* () => this.handleHasFavorite() */);
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
                      <MusicCard music={ favorite } upFavorite={ this.getFavorites } />
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
