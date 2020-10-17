import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';

import './app.css';
import PeoplePage from '../people-page/people-page';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    hasError: false
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };



  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }


    const planet = this.state.showRandomPlanet ?
      <RandomPlanet /> :
      null;

    console.log('render app')
    return (

      <div className="stardb-app">
        <Header />
        { planet}

        <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
        </button>

          <ErrorButton />
        </div>
        <PeoplePage />
        <PeoplePage />
        <PeoplePage />

      </div>
    );

  }
}

