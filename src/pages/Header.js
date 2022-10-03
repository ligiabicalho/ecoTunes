import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    const { loginName } = this.state;
    this.setState({
      loading: true,
    });
    getUserSaved = async () => {
      await getUser();
    };
  }

  render() {
    return (
      <header data-testid="header-component">
        Header...
      </header>
    );
  }
}

export default Header;
