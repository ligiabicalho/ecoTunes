import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    musics: '',
    loading: true,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props; // props nativas do Route, permite pegar o parâmetro :id do path.
    this.setState({
      musics: await getMusics(id),
      loading: false,
    });
  }

  render() {
    const { musics, loading } = this.state;
    return (
      <>
        <Header />
        {
          loading
            ? <Loading />
            : (
              <div data-testid="page-album">
                <MusicCard musics={ musics } />
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
