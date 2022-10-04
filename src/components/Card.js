import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const { resultados } = this.props;
    return (
      <div className="card-search-result">
        <h3>
          Resultado de álbuns de:
          {resultados[0].artistName}
        </h3>
        <div>
          {resultados.map((item) => (
            <div key={ item.collectionId }>
              Artista:
              {item.artistName}
              <br />
              Album:
              {item.collectionName}
              <br />
              <img src={ item.artworkUrl100 } alt={ item.artistName } />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  resultados: PropTypes.arrayOf,
}.isRequired;

export default Card;
