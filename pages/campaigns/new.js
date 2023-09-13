import React, {Component} from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3'


//Router allows to programmatically direct users from one page to another
import { Router } from '../../routes';

class CampaignNew extends Component {

	//Records the state that the user is typing in the input
	state = {
		minimumContribution: '',
		errorMessage: '',
		loading: false
	};
	
	//we use this syntax to make sure that "this" object is correct in this method
	onSubmit = async (event)=> {
		
		//on form submittal the browser is trying to submit the 
		//page on the back end server, we prevent the browser from attempting to
		//submit the form.
		event.preventDefault();
		
		
		this.setState({ loading: true, errorMessage: '' });
		
		try {
			const accounts = await web3.eth.getAccounts();
		
			//when we send transactions from the browser
			//we don't have to specify gas, metamask does this automatically for us
			await factory.methods
			.createCampaign(this.state.minimumContribution)
			.send({
				from: accounts[0]
			});
			
			//Redirect user to the campaign index page
			Router.pushRoute('/');
			
		} catch(err) {
			this.setState({ errorMessage: err.message });
		}
		
		this.setState({ loading: false });
	};
	
	render() {
		return (
			<Layout>
				<h3>Create a Campaign</h3>
				
				{/*When the form is submitted, a new campaign is created
				turns a string to its equivalent boolean value*/}
				<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Field>
						<label>Minimum Contribution</label>
						<Input
							label="wei" 
							labelPosition="right"
							value={this.state.minimumContribution}
							onChange={event => 
							this.setState({ minimumContribution: event.target.value })}
						/>
					</Form.Field>
					
					{/*Messages are not displayed by default
					we need the error prop at the Form level*/}
					<Message 
						error
						header="Oops!"
						content={this.state.errorMessage}
					/>
					
					<Button loading={this.state.loading} primary>Create!</Button>
				</Form>
			</Layout>
		);
	}
}

export default CampaignNew;