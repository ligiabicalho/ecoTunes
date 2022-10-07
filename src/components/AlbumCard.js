import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { artistName, collectionName, collectionId, artworkUrl100 } = this.props;
    return (
      <div className="card-search-result">
        <p>
          {`Artista: ${artistName}`}
        </p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <p>
            {`Album: ${collectionName}`}
          </p>
          <img src={ artworkUrl100 } alt={ artistName } />
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  collectionId: PropTypes.number,
  artworkUrl100: PropTypes.string,
}.isRequired;

export default AlbumCard;
