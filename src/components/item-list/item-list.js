import React, { Component } from 'react';
import SwapiServise from '../../services/swapi-service';
import Spinner from "../spinner/index";

import './item-list.css';

export default class ItemList extends Component {

  // swapiService = new SwapiServise();

  state = {
    itemList: null
  }

  componentDidMount() {

    const { getData } = this.props;

    getData().then((itemList) => {
      console.log(itemList)
      this.setState({itemList})
    })
  }

  renderItems(arr) {
    return arr.map(({name, id}) => {
      return (
        <li className="list-group-item"
         key={id}
         onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      )
    })
  }
  render() {

    const { itemList } = this.state;

    if (!itemList) {
      return <Spinner/>
    }

    const items = this.renderItems(itemList);
    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}