import React, {Component} from 'react';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3'


//Router allows to programmatically direct users from one page to another
import {Router} from '../../routes';

class CampaignNew extends Component {


    /**
     * Records the state of the form that is used by the user
     * @type {{errorMessage: string, minimumContribution: string, loading: boolean}}
     */
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };


    /**
     * Event handler for submitting the form. we use this syntax to make sure that
     * "this" object is set correctly in this method. on form submittal the browser is trying to submit the
     * page on the back end server. We prevent the browser from attempting to submit the form by
     * calling event.preventDefault.
     *
     * @param event The input event.
     * @returns {Promise<void>}
     */
    onSubmit = async (event) => {

        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            // When we send transactions from the browser
            // We don't have to specify gas, metamask does this automatically.
            // Only account is needed
            await factory.methods.createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });

            //Redirect user to the campaign index page
            Router.pushRoute('/');

        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});
    };

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>

                {/*We pass a reference of onSubmit method in the form even handler.*/}
                {/* Exlamation mark converts a string to boolean and flips its value*/}
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event =>
                                this.setState({minimumContribution: event.target.value})}
                        />
                    </Form.Field>

                    {/*Semantic ui component for displaying messages. These are not displayed by default, we need the error prop at the Form level*/}
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