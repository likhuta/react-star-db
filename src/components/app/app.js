import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiServise from '../../services/swapi-service';
import ItemList from '../item-list';
import ErrorBoundry from '../error-boundry';
import ItemDetails, { Record } from "../item-details/item-details";

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
    const { getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage,
      getAllPeople,
      getAllPlanets } = this.swapiService;

      const personDetails = (
        <ItemDetails
          itemId={11}
          getData={getPerson}
          getImageUrl={getPersonImage} >
  
          <Record field="gender" label="Gender" />
          <Record field="eyeColor" label="Eye Color" />
  
        </ItemDetails>
      );
  
      const starshipDetails = (
        <ItemDetails
          itemId={5}
          getData={getStarship}
          getImageUrl={getStarshipImage}>
  
          <Record field="model" label="Model" />
          <Record field="length" label="Length" />
          <Record field="costInCredits" label="Cost" />
        </ItemDetails>
      );
  

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet /> :
      null;



    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />

          <ItemList
            getData={getAllPeople}
            onItemSelected={() => {}}>

            { ({name}) => <span>{name}</span> }
          </ItemList>

          <ItemList
            getData={getAllPlanets}
            onItemSelected={() => {}}>

            { ({name}) => <span>{name}</span> }
          </ItemList>

        </div>
      </ErrorBoundry>
    );

  }
}

