import React, { Component } from 'react';
import{ Form, Input, Message, Button } from 'semantic-ui-react';
import MusicDapp from '../ethereum/musicContract';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class CheckForm extends Component {

  state={
    value: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async(event) =>
  {
    event.preventDefault();
    const contract =MusicDapp(this.props.address)

    this.setState({loading: true, errorMessage: ''});


    this.setState({errorMessage: await contract.methods.checkTicket(this.state.value).call()})



    this.setState({loading: false, value: ''});

  }
  render() {
    return (
      <Form  onSubmit={this.onSubmit}  error={!!this.state.errorMessage}>
        <Form.Field>
          <label> Check Account </label>
          <Input
          value={this.state.value}
          onChange={event => this.setState({ value: event.target.value })}
          />
        </Form.Field>
        <Message error header="Message from Contract" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Check!!!
        </Button>
      </Form>
    );
  }
}

export default CheckForm;
