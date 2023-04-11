import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    user: [],
    loading: true,
  };

  componentDidMount() {
    this.getUserSaved();
  }

  getUserSaved = async () => {
    const user = await getUser();
    this.setState({
      loading: false,
      user,
    });
  };

  render() {
    const { loading, user: { name, description, image, email } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading
          ? <Loading />
          : (
            <>
              <Link to="/profile/edit">
                <button type="button">Editar perfil</button>
              </Link>
              <div id="profile-image">
                {image
                  ? (
                    <img
                      src={ image }
                      alt={ name }
                      data-testid="profile-image"
                    />
                  )
                  : <p data-testid="profile-image">Adicione uma foto</p>}
              </div>
              <h3>Nome de usuário:</h3>
              <p>{name}</p>
              <h3>E-mail:</h3>
              {email ? <p>{email}</p> : <p>Adicione um e-mail de contato</p>}
              <h3>Descrição:</h3>
              {description
                ? <p>{description}</p>
                : <p>Adicione uma descrição</p>}
            </>)}
      </div>
    );
  }
}

export default Profile;
