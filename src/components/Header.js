import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    loginName: '',
  };

  componentDidMount() {
    this.getUserSaved(); // SEMPRE usar o "this." para chamar uma função no component class do React!!!
  }

  getUserSaved = async () => {
    this.setState({ loading: true });
    const user = await getUser(); // função importada
    this.setState({
      loading: false,
      loginName: user.name,
    });
  };

  render() {
    const { loading, loginName } = this.state;

    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa </Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas </Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil </Link>
        </nav>
        {loading
          ? <Loading />
          : <p data-testid="header-user-name">{loginName}</p>}
      </header>
    );
  }
}

export default Header;
