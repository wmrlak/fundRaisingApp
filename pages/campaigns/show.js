import React, {Component} from 'react';
import {Card, Grid, Button} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';

class CampaignShow extends Component {

    // We know the address of the campaign and it is stored in the props object.
    // This props object is separate than the one in the actual component instance
    static async getInitialProps(props) {

        //props.query.address is the address of every campaign contract
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        //return an object where all the properties are labeled
        //instead of referencing summary directly
        return {
            //only getInitialProps knows about props.query.address the rest of the methods in the component don't
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }


    renderCards() {

        //destructuring of the object
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The address of the account who created this campaign and can create requests to withdraw money',
                style: {overflowWrap: 'break-word'} //long addresses are broken to a separate line
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become a contributor.',
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by contributors',
            },
            {
                header: approversCount,
                meta: 'Number of Contributors',
                description: 'Number of people who have already donated to this campaign',
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Total Campaign Balance (in ether)',
                description: 'The balance is how much money this campaign has left to spend',
            }

        ];

        return <Card.Group items={items}/>;
    }


    render() {
        return (
            <Layout legacyBehavior>
                <h3>Campaign Show</h3>

                <Grid>

					{/*Row 1*/}
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>

                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>

					{/*Row 2, no need to specify width column here as there is only one column*/}
                    <Grid.Row>
                        <Grid.Column>
                            <Link legacyBehavior route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Layout>
        );
    }
}

export default CampaignShow;