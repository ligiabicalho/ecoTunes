import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends React.Component {
  state = {
    searchInput: '',
    artist: '',
    btnSrcDisabled: true,
    resultados: [],
    researched: false,
  };

  handleSearchButton = async () => {
    const { searchInput } = this.state;
    this.setState({
      loading: true,
      artist: searchInput,
    });
    // Como é função de outro arquivo, não usar o "this." e fazer o import!
    // Parâmetro: valor do input a ser pesquisado;
    const results = await searchAlbumsAPI(searchInput);

    this.setState(
      {
        loading: false,
        resultados: results,
        searchInput: '',
        researched: true,
      },
      () => this.handleButtonValidation(),
    );
  };

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState(
      { searchInput: value },
      () => this.handleButtonValidation(),
      // PQ É DIFERENTE SÓ CHAMAR A FUNÇÃO OU COLOCAR UMA ARROW FUNCTION?
    );
  };

  handleButtonValidation = () => {
    const { searchInput } = this.state;
    const inputMin = searchInput.length < 2; // false
    this.setState({ btnSrcDisabled: inputMin });
  };

  render() {
    const { searchInput, btnSrcDisabled, loading,
      resultados, artist, researched } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading
          ? <Loading />
          : (
            <>
              <form>
                <label htmlFor="search-input">
                  <input
                    data-testid="search-artist-input"
                    id="search-input"
                    name="searchInput"
                    type="text"
                    value={ searchInput }
                    onChange={ this.handleInputChange }
                  />
                </label>
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ btnSrcDisabled }
                  onClick={ this.handleSearchButton }
                >
                  Pesquisar
                </button>
              </form>

              {researched && (
                <div className="result">
                  <h3>
                    {' '}
                    Resultado de álbuns de:
                    {' '}
                    {artist}
                  </h3>
                  {(resultados.length > 0)
                    ? <AlbumCard resultados={ resultados } />
                    : <p>Nenhum álbum foi encontrado</p>}
                </div>
              )}
            </>)}
      </div>
    );
  }
}

export default Search;
