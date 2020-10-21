import React from 'react';
import { PersonDetails, PersonList } from '../sw-components';
import {withRouter} from 'react-router-dom';
import Row from '../row';

const PeoplePage = ({history, match}) => {


  const { id } = match.params;
  console.log(id)

    return (
      <Row
        left={<PersonList onItemSelected={(itemId) => {
          history.push(itemId)
        }} />}
        right={<PersonDetails itemId={id} />} />
    );

}
export default  withRouter(PeoplePage);