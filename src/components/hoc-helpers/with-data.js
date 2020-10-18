import React, { Component } from 'react';
import Spinner from '../spinner';

const withData = (View, getData) => {

  return class extends Component {

    state = {
      data: null
    }

    componentDidMount() {
      getData().then((data) => {
        console.log(data)
        this.setState({ data })
      })
    }


    render() {
      const { data } = this.state;

      if (!data) {
        return <Spinner />
      }

      return <View {...this.props} data={data} />
    }
  }
}

export default withData;