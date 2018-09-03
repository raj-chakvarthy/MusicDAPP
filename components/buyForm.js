import React, { Component } from 'react';
import{ Form, Input, Message, Button } from 'semantic-ui-react';
import MusicDapp from '../ethereum/musicContract';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class BuyForm extends Component {

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

    try{
      const accounts=await web3.eth.getAccounts();
      await contract.methods.buy().send({
        from: accounts[0],
        value:this.state.value
      });
      this.setState({errorMessage: 'Transaction Successful'})
      Router.replaceRoute(`/concerts/${this.props.address}`)
    }catch (err) {
      this.setState({errorMessage: err.message});
    }
    this.setState({loading: false, value: ''});

  }
  render() {
    return (
      <Form  onSubmit={this.onSubmit}  error={!!this.state.errorMessage}>
        <Form.Field>
          <label> Ticket Cost </label>
          <Input
          value={this.state.value}
          onChange={event => this.setState({ value: event.target.value })}
          label="ether"
          labelPosition="right"
          />
        </Form.Field>
        <Message error header="Message from Contract" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Buy Ticket
        </Button>
      </Form>
    );
  }
}

export default BuyForm;
