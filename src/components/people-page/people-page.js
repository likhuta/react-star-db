import React, { Component } from 'react';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorIndicator from '../error-indicator';
import SwapiServise from '../../services/swapi-service';
import Row from '../row'
import ErrorBoundry from '../error-boundry';

import './people-page.css';

export default class PeoplePage extends Component {

  swapiService = new SwapiServise();

  state = {
    selectedPerson: 3,
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  }
itemId

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
      >

        {(i) => (`${i.name} - ${i.birthYear})`)}

      </ItemList>

    )

    const personDetails = (
      <ErrorBoundry>
        <ItemDetails itemId={this.state.selectedPerson} />
      </ErrorBoundry>
    )

    return (
      <Row left={itemList} right={personDetails} />
    )
  }


}