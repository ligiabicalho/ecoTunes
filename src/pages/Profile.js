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
    const { loading, user } = this.state;
    console.log(user.name);
    return (
      <div data-testid="page-profile">
        <Header />
        {loading
          ? <Loading />
          : (
            <>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <img src={ user.image } alt={ user.name } data-testid="profile-image" />
              {user.description}
              <Link to="/profile/edit">Editar perfil</Link>
            </>)}
      </div>
    );
  }
}

export default Profile;
