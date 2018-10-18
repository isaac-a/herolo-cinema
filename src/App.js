import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';

import Header from './components/Header/Header';
import MovieList from './components/MovieList/MovieList';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Header />
          <MovieList />
        </Fragment>
      </Provider>
    );
  }
}

export default App;
