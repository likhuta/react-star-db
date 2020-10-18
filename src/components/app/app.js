import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';
import PeoplePage from '../people-page/people-page';
import SwapiServise from '../../services/swapi-service';

export default class App extends Component {
  swapiService = new SwapiServise();
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

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList getData={this.swapiService.getAllPlanets} onItemSelected={this.onPersonSelected} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList getData={this.swapiService.getAllStarships} onItemSelected={this.onPersonSelected} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>


      </div>
    );

  }
}

