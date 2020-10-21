import React, { Component } from "react";
import {BrowserRouter as  Router, Route} from 'react-router-dom';

import Header from "../header";
import RandomPlanet from "../random-planet";
import SwapiServise from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";

import { SwapiServiceProvider } from "../swapi-service-context";
import DummySwapiService from "../../services/dummy-swapi-service";
import { PeoplePage, StarshipPage, PlanetPage } from "../pages";
import StarshipDetails from '../sw-components/starship-details'
import "./app.css";

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    hasError: false,
    swapiService: new SwapiServise(),
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiServise ? DummySwapiService : SwapiServise;
      return {
        swapiService: new Service(),
      };
    });
  };

  render() {

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>

          <Router>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange} />
           
            <RandomPlanet />

            <Route path="/" exact render={() => <h2>Welcome</h2>} />

            <Route path="/people/:id?" component={PeoplePage} />
            <Route path="/planets" component={PlanetPage} />
            <Route path="/starships" exact component={StarshipPage} />
            <Route path="/starships/:id" 
              render={({match}) => {
                return <StarshipDetails itemId={match.params.id} />
              } } />
          </div>

          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
