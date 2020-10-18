import React, { Component } from 'react';
import SwapiServise from '../../services/swapi-service';
import Spinner from "../spinner/index";
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from '../error-indicator';

import './item-details.css';

export default class ItemDetails extends Component {

  state = {
    item: null,
    loading: true,
    image: null,
    error: false,
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({ loading: true })

      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId).then((item) => {
      this.setState({ 
        item, 
        loading: false,
      image: getImageUrl(item) })
    }).catch(() => {
      this.setState({error: true, loading: false})
    })
  }

  render() {

    if (!this.state.item && !this.state.error) {
      return <span>Select a person from a list</span>
    } else if (this.state.loading) {
      return  <Spinner/>
    }

    if (this.state.error) {
      return (<ErrorIndicator />)
    }

    const {item, image } = this.state;
    const { id, name, gender, birthYear, eyeColor } = item;


    return (
      <div className="item-details card">
        <img className="item-image"
          src={image} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}
