import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  state = {
    loginName: '',
    buttonDisabled: true,
  };

  // componentDidMount() {
  //   this.setState({
  //     loading: false,
  //   });
  // }

  handleNameChange = (event) => {
    const { value } = event.target;
    this.setState(
      { loginName: value }, // atualiza state com o q estiver no input  e chama a validação do botão como segundo parâmetro, assim pega o state atualizado para verificar.
      () => this.handleButtonValidation(),
    );
  };

  handleButtonValidation = () => {
    const { loginName } = this.state;
    const three = 3;
    const nameMin = loginName.length < three; // Qndo >3, false;
    this.setState({ buttonDisabled: nameMin });
  };

  /* Ao clicar no botão Entrar, utilize a função createUser da userAPI para salvar o nome digitado -> LOCAL STORAGE. */
  /* Ao clicar no botão Enviar , a mensagem Carregando... é exibida e após a resposta da API acontece o redirecionamento para a rota /search. */
  handleClick = async () => {
    const { loginName } = this.state;
    const { history } = this.props; // props nativa.
    this.setState({
      loading: true,
    });
    await createUser({ name: loginName }); // não precisa do tample literals pq não ta concatenando.
    history.push('/search');
    // this.setState({
    //   loading: false,
    // }); // desnecessário neste caso, pq não vai dar falha.
  };

  render() {
    const { loginName, buttonDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <label htmlFor="login-name">
          Nome de usuário:
          <input
            type="text"
            id="login-name"
            name="loginName"
            value={ loginName } // Não é necessário usar aqui, mas é uma boa prática.
            onChange={ this.handleNameChange }
            data-testid="login-name-input"
          />
        </label>
        <button
          name=""
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.handleClick }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
        { loading && <Carregando /> }
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string, // ??
}.isRequerid;

export default Login;
