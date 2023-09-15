import React, {Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

/**
 * Shows a list of requests to the user
 */
class RequestIndex extends Component {

    static async getInitialProps(props) {

        const {address} = props.query;

        // Get the number of requests and then fetch every request one-by-one.
        // Solidity doesn't support returning an array of structs.
        // TODO: try to see if Solidity supports returning an array of structs in the  future.
        const campaign = Campaign(address);

        const requestCount = await campaign.methods.getRequestsCount().call();

        //number of people participating in this campaign
        const approversCount = await campaign.methods.approversCount().call();

        // Issue all the calls for getting requests in one go and wait all of them to be resolved
        // by using a promise. getRequestsCount() returns a number as a string
        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()     //Creates an array starting form 0 up to requestCount - 1
                .map((element, index) => {
                    return campaign.methods.requests(index).call()
                })
        );

        return {address, requests, requestCount, approversCount};
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return (<RequestRow
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />);
        });
    }


    render() {

        //destructure the props of the Table object to ease typing in the following
        const {Header, Row, HeaderCell, Body} = Table;

        return (
            <Layout>
                <h3>Requests</h3>

                <Link legacyBehavior route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{marginBottom: 10}}> Add Request</Button>
                    </a>
                </Link>

                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>

                    <Body>{this.renderRows()}</Body>

                </Table>

                <div>Found {this.props.requestCount} requests</div>
            </Layout>
        )
    }
}

export default RequestIndex;