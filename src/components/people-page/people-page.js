import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import SwapiServise from '../../services/swapi-service';

import './people-page.css';

export default class PeoplePage extends Component {

  swapiService = new SwapiServise();

  state = {
    selectedPerson: 3,
    hasError: false,
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  }

  componentDidCatch() {
    this.setState({hasError: true})
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />

    }

    return (
      <div className="row mb2">
      <div className="col-md-6">
        <ItemList onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople} />
      </div>
      <div className="col-md-6">
        <PersonDetails personId={this.state.selectedPerson} />
      </div>
    </div>

    )
  }


}