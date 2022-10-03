import React from 'react';
import { Router, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <>
        <h1>TrybeTunes</h1>
        <main>
          <Switch>
            <Router exact path="/" component={ Login } />
            <Router path="/search" component={ Search } />
            <Router path="/album/:id" component={ Album } />
            <Router path="/favorites" component={ Favorites } />
            <Router path="/profile" component={ Profile } />
            <Router path="/profile/edit" component={ ProfileEdit } />
            <Router path="*" component={ NotFound } />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
