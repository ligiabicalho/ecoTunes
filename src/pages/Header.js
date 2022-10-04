import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  state = {
    loginName: '',
  };

  componentDidMount() {
    this.getUserSaved(); // SEMPRE usar o "this." para chamar uma função no component class do React!!!
  }

  getUserSaved = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      loading: false,
      loginName: user.name,
    });
  };

  render() {
    const { loading, loginName } = this.state;

    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa </Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas </Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil </Link>
        </nav>
        {loading
          ? <Carregando />
          : <p data-testid="header-user-name">{ `Usuário: ${loginName}` }</p>}
      </header>
    );
  }
}

export default Header;
