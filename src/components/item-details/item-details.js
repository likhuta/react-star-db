import React, { Component } from 'react';
import Spinner from "../spinner/index";
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from '../error-indicator';

import './item-details.css';
const Record = ({ item, field, label }) => {

  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>

  )
}

export { Record };
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
        image: getImageUrl(item)
      })
    }).catch(() => {
      this.setState({ error: true, loading: false })
    })
  }

  render() {

    if (!this.state.item && !this.state.error) {
      return <span>Select a person from a list</span>
    } else if (this.state.loading) {
      return <Spinner />
    }

    if (this.state.error) {
      return (<ErrorIndicator />)
    }

    const { item, image } = this.state;
    const { name } = item;


    return (
      <div className="item-details card">
        <img className="item-image"
          src={image} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {
                  item
                });
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}
