import React, { Component } from 'react';
import Layout from '../../components/Layout';
import MusicDapp from '../../ethereum/musicContract';
import {Card, Grid, Button} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';
import BuyForm from '../../components/buyForm';
import CheckForm from '../../components/checkForm';
import ipfs from './ipfs';

class CampaignShow extends Component {
  static async getInitialProps(props){
    const campaign = MusicDapp(props.query.address);
    const summary = await campaign.methods.getSummary().call();


    return {
      address: props.query.address,
      concert_name: summary[0],
      concert_desc: summary[1],
      ticketCost: summary[2],
      capacity: summary[3],
      dateTime: summary[4],
      place: summary[5],
      image: summary[6],
      manager: summary[7]

    };
  }


  renderCards(){
    const{
      concert_name,
      concert_desc,
      ticketCost,
      capacity,
      dateTime,
      place,
      image,
      manager
    } = this.props;

    const items = [
    
      {
        header: manager,
        meta: 'Manager of the Concert',
        description: 'The manager created this concert and is responsible for the event',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: concert_name,
        meta: 'concert name',
        description: concert_desc
      },
      {
        header: dateTime,
        meta: 'Please be on Time',
        description: '*** Entry closed after 30 mins from the start of the concert'
      },
      {
        header: capacity,
        meta: 'Total Seats'
      },
      {
        header: ticketCost,
        meta: 'Ticket cost in Wei (1 Wei = 0.000000000000000001 ethers)',
        description: '***'
      },
      {
        header: place,
        meta: 'Please bring a valid Photo ID',
        description: 'Venues might have Terms and Conditions, please visit the venue website for more details'
      }
    ];
    return <Card.Group items={items}/>;
  }


  render() {
    return (
      <Layout>
        <h3>Concert Details </h3>

        <Grid>
          <Grid.Row>
            <Grid.Column width={14}>
              <img src={`https://ipfs.io/ipfs/${this.props.image}`} height= "250" width= "900" />
              {this.renderCards()}

            </Grid.Column>
            <Grid.Column width={2}>
              <BuyForm address={this.props.address} />
              <br />
              <br/>
              <CheckForm address={this.props.address} />
              <br />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}
export default CampaignShow;
