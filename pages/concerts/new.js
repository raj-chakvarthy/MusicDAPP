import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Form, Button ,Input, Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';
import ipfs from './ipfs';

class CampaignNew extends Component {
  constructor(props) {
    super(props)
    this.state ={
      name: '',
      description: '',
      ticketCost: '',
      seats:'',
      dateTime: '',
      venue: '',
      ipfsHash: '',
      errorMessage: '',
      loading: false
    };

    this.captureFile = this.captureFile.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
  }

  captureFile = (event) => {
  console.log('capute file')
  event.preventDefault()
  const file= event.target.files[0]
  let reader= new window.FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => {
    this.setState({ buffer: Buffer(reader.result)})
    console.log('buffer',this.state.buffer)
  }
};

  onUpload =async (event)=> {
    event.preventDefault();
    this.setState({loading: false, errorMessage: ''});
    await ipfs.add(this.state.buffer, (error, ipfsHash) => {
      console.log(error,ipfsHash);

      this.setState({ipfsHash: ipfsHash[0].hash})
      console.log('ipfsHash',this.state.ipfsHash)
    })
  };

  onSubmit = async (event)=> {
    event.preventDefault();
    this.setState({loading: true, errorMessage: ''});
    try{
      const accounts= await web3.eth.getAccounts();
      await factory.methods.createConcert((this.state.name),(this.state.description),(this.state.ticketCost),(this.state.seats),(this.state.dateTime),(this.state.venue),(this.state.ipfsHash)).send({from: accounts[0]});


      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message});  // message is a property of err
    }
    this.setState({loading: false});
  };
  render() {

    return (
      <Layout>
      <h3>Create a New Concert</h3>

      <h3> Upload Concert Image (this prefills IPFS Hash) </h3>
      <input type='file' onChange= {this.captureFile} />
      <Button primary onClick ={this.onUpload}>Upload</Button>

      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
      <Form.Field>
        <label>Name of Concert</label>
        <Input
        value= {this.state.name}
        onChange= {event => this.setState({name: event.target.value})} />
      </Form.Field>

        <Form.Field>
          <label>Description of Concert</label>
          <Input
          value= {this.state.description}
          onChange= {event => this.setState({description: event.target.value})} />
        </Form.Field>

        <Form.Field>
          <label>Specify Ticket Cost</label>
          <Input
          label='wei'
          labelPosition='right'
          value= {this.state.ticketCost}
          onChange= {event => this.setState({ticketCost: event.target.value})} />
        </Form.Field>

        <Form.Field>
          <label>Specify Number of Seats</label>
          <Input
          value= {this.state.seats}
          onChange= {event => this.setState({seats: event.target.value})} />
        </Form.Field>

        <Form.Field>
          <label>Date Time</label>
          <Input
          value= {this.state.dateTime}
          onChange= {event => this.setState({dateTime: event.target.value})} />
        </Form.Field>

        <Form.Field>
          <label>Venue</label>
          <Input
          value= {this.state.venue}
          onChange= {event => this.setState({venue: event.target.value})} />
        </Form.Field>

        <Form.Field>
          <label>Ipfs Hash</label>
          <Input
          value= {this.state.ipfsHash}
          />
        </Form.Field>




        <Message error header="Opps!" content={this.state.errorMessage} />
        <Button loading={this.state.loading} primary>Create</Button>
      </Form>
      </Layout>
    );

  }
}
export default CampaignNew;
