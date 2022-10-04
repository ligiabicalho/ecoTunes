import React from 'react';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Card from '../components/Card';

class Search extends React.Component {
  state = {
    searchInput: '',
    btnSrcDisabled: true,
  };

  componentDidMount() {
  }

  handleSearchButton = async () => {
    const { searchInput } = this.state;
    this.setState({
      loading: true,
      // searchInput: '', // Se eu limpar assim, o parâmetro vai vazio...
    });
    // Parâmetro: valor do input a ser pesquisado;
    const result = await searchAlbumsAPI(searchInput); // Como é função de outro arquivo, não usar o "this." e fazer o import!
    // console.log(result);
    this.setState({
      loading: false,
      resultados: result,
      searchInput: '',
    });
  };

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState(
      { searchInput: value },
      () => this.handleButtonValidation(), // PQ É DIFERENTE SÓ CHAMAR A FUNÇÃO OU COLOCAR UMA ARROW FUNCTION?
    );
  };

  handleButtonValidation = () => {
    const { searchInput } = this.state;
    const inputMin = searchInput.length < 2;
    this.setState({ btnSrcDisabled: inputMin });
  };

  render() {
    const { searchInput, btnSrcDisabled, loading, resultados } = this.state;
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
              {/* Requisito 6 item 1, subitem 3. */}
              { resultados !== undefined
                && <Card resultados={ resultados } />}

            </>
          )}
      </div>
    );
  }
}

export default Search;
