import React from 'react';
import Header from './Header';

class Search extends React.Component {
  state = {
    searchInput: '',
    btnSrcDisabled: true,
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
    const { searchInput, btnSrcDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
