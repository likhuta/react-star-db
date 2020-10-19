import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiServise from '../../services/swapi-service';
import ItemList from '../item-list';
import ErrorBoundry from '../error-boundry';
import ItemDetails, { Record } from "../item-details/item-details";
import { PersonList, PlanetList, StarshipList, PersonDetails, PlanetDetails, StarshipDetails } from '../sw-components'

import './app.css';


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

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet /> :
      null; 


    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />

          <PersonDetails itemId={11} />
          <PlanetDetails itemId={5} />

          <StarshipDetails itemId={9} />

          <PersonList/>

          <PlanetList/>

          <StarshipList/>

        </div>
      </ErrorBoundry>
    );

  }
}

