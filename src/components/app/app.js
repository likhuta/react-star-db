import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import PersonDetails, { Record } from '../item-details/item-details';

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
        getImageUrl={this.swapiService.getPersonImage} >

        <Record field='gender' label='Gender' />
        <Record field='eyeColor' label='Eye Color' />

      </ItemDetails>
    )

    const starShipDetails = (
      <ItemDetails
        itemId={9}
        getData={this.swapiService.getStarShip}
        getImageUrl={this.swapiService.getStarshipImage}>

        <Record field='model' label='Model' />
        <Record field='length' label='Length' />

      </ItemDetails>
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

