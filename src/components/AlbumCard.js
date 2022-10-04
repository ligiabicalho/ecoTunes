import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { resultados } = this.props;
    return (
      <div className="card-search-result">
        <ul>
          {resultados.map((item) => (
            <li key={ item.collectionId }>
              Artista:
              {item.artistName}
              <br />
              <Link
                to={ `/album/${item.collectionId}` }
                data-testid={ `link-to-album-${item.collectionId}` }
              >
                Album:
                {item.collectionName}
                <br />
                <img src={ item.artworkUrl100 } alt={ item.artistName } />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  resultados: PropTypes.arrayOf,
}.isRequired;

export default AlbumCard;
