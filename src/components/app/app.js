import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import PersonDetails from '../item-details';

import './app.css';
import PeoplePage from '../people-page/people-page';
import SwapiServise from '../../services/swapi-service';
import ItemDetails from '../item-details';
import Row from '../row'

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

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={this.swapiService.getPerson}
        getImageUrl={this.swapiService.getPersonImage} />
    )

    const starShipDetails = (
      <ItemDetails
      itemId={8}
        getData={this.swapiService.getStarShip}
        getImageUrl={this.swapiService.getStarshipImage}  />
    )

    return (

      <div className="stardb-app">
        <Header />
        {/* { planet} */}

        <div className="row mb2 button-row">
          {/* <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
        </button>

          <ErrorButton /> */}
        </div>
        {/* <PeoplePage /> */}

        <Row
          left={personDetails}
          right={starShipDetails} />

      </div>
    );

  }
}

