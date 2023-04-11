import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    description: '',
    image: '',
    email: '',
    buttonDisabled: true,
    loading: true,
  };

  componentDidMount() {
    this.getUserSaved();
  }

  getUserSaved = async () => {
    const { name, description, image, email } = await getUser();
    this.setState({
      loading: false,
      name,
      description,
      image,
      email,
    }, () => this.validationInputs());
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validationInputs());
  };

  // TO DO
  updateProfile = async () => {
    const { name, description, image, email } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await updateUser(
      { name, description, image, email },
    );
    this.setState({ loading: false });
    history.push('/profile');
  };

  validationInputs = () => {
    const { name, description, image, email } = this.state;
    const requiredInputs = name && description && image && email;
    const emailValid = email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i);
    if (emailValid && requiredInputs) {
      this.setState({ buttonDisabled: false });
    }
  };

  render() {
    const { name, description, image, email,
      loading, buttonDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading
          ? <Loading />
          : (
            <form>
              <label htmlFor="name">
                Nome de usuário:
                <input
                  data-testid="edit-input-name"
                  name="name"
                  id="name"
                  type="text"
                  placeholder="altere seu nome de usuário"
                  value={ name }
                  onChange={ this.handleChange }
                  required
                />
              </label>
              <br />
              <label htmlFor="email">
                Seu e-mail:
                <input
                  data-testid="edit-input-email"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="adicione um e-mail"
                  value={ email }
                  onChange={ this.handleChange }
                  required
                />
              </label>
              <br />
              <label
                htmlFor="description"
              >
                Descrição:
                <input
                  data-testid="edit-input-description"
                  id="description"
                  name="description"
                  type="textarea"
                  placeholder="adicione uma descrição"
                  value={ description }
                  onChange={ this.handleChange }
                  required
                />
              </label>
              <br />
              {image
                ? (
                  <div id="profile-image">
                    <img
                      src={ image }
                      alt={ name }
                      data-testid="profile-image"
                    />
                  </div>
                )
                : <p data-testid="profile-image">Adicione uma foto</p>}
              <label
                htmlFor="image"
              >
                Link para sua foto:
                <input
                  data-testid="edit-input-image"
                  id="image"
                  name="image"
                  type="text"
                  placeholder="adicione link para sua foto"
                  value={ image }
                  onChange={ this.handleChange }
                />
                {/* TODO: adicionar imagem do computador.
                <input
                  data-testid="edit-input-image"
                  id="image"
                  name="image"
                  type="file"
                  accept="image/png, image/jpeg"
                  value={ image }
                  onChange={ this.handleChange }
                  required
                /> */}
              </label>
              <br />
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ buttonDisabled }
                onClick={ this.updateProfile }
              >
                Salvar
              </button>
            </form>)}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
