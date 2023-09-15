import React, {Component} from 'react';
import {Form, Input, Message, Button} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';


class ContributeForm extends Component {

    state = {
        value: '',
        errorMessage: '',
        loading: false
    };


    onSubmit = async (event) => {

        //keep the form from attempting to submit itself
        event.preventDefault();

        const campaign = Campaign(this.props.address);

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });

            //Refresh the current route, this triggers getInitialProps() in show component
            //to re-run and get the latest data on the screen.
            //don't use Router.pushRoute() as this creates a new entry on the browser history
            //and the user has to press the back button to see the updated contract data in the show page
            Router.replaceRoute(`/campaigns/${this.props.address}`);

        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false, value: ''})
    };

    render() {
        const {Field} = Form;

        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                        label="ether"
                        labelPosition="right"

                    />
                </Field>

                {/*Component for showing error messages*/}
                <Message error header="Oops!" content={this.state.errorMessage}/>

                <Button primary loading={this.state.loading}>
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;