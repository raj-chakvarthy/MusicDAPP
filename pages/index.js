import React, { Component } from 'react';
import factory from '../ethereum/factory';
import {Card, Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class ConcertIndex extends Component {

  static async getInitialProps() {
    const concerts = await factory.methods.getDeployed().call();
    console.log(concerts);
    return {concerts};
  }

  renderConcerts() {
    const items = this.props.concerts.map(address => {
      return {
        header: `Concert deployed to address: ${address}`,
        description: (
          <Link route={`/concerts/${address}`}>
            <a>View Concert</a>
          </Link>

        ),
        fluid:true
      };
    });
    return <Card.Group items={items} />;
  }


  render() {
    return (
      <Layout>
      <div>

        <h3> Concerts List </h3>
        <Link route='concerts/new'>
          <a>
            <Button  floated='right' content="Create Concert" icon="add circle" primary />
          </a>
        </Link>

        {this.renderConcerts()}
    </div>
    </Layout>
    );
  }
}
export default ConcertIndex;
