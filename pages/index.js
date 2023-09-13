
import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout'
import { Link } from '../routes';

/**
 * Index.js is the root route for next. This is the first displayed page.
 */
class CampaignIndex extends Component {
	
	// Do the data fetching on Next.js server, retrieves the data from the network
	// Once the data is available, CampaignIndex is rendered on the server side and campaigns are available in
	// the component. This method needs to be static.
	static async getInitialProps() {
		const campaigns = await factory.methods.getDeployedCampaigns().call();
		return { campaigns };
	}


	/**
	 * Returns a Card.Group component that represents all the available campaigns.
	 *
	 * @returns {JSX.Element}
	 */
	renderCampaigns() {
		//Access the campaigns property, at this stage this should be initialized
		const items = this.props.campaigns.map(address => {
			return {
				header: address,
				description: (
					<Link legacyBehavior route={`/campaigns/${address}`}>
						<a>View Campaign</a>
					</Link>
				),
				fluid: true
			};
		});
		
		return <Card.Group items={items} />;
	}
	

	render() {
		return (
			//Create a Layout component that includes the other React components in
		<Layout>
			<div>
				<h3>Open Campaigns</h3>

				{/*Button */}
				<Link legacyBehavior route="/campaigns/new">
					<a>
						<Button
							floated="right"
							content="Create Campaign"
							icon="add circle"
							primary //equivalent to primary={true}
						/>
					</a>
				</Link>

				{/*List of campaigns */}
				{this.renderCampaigns()}

			</div>
		</Layout>
		);
	}
}

//Next always needs a component to be exported
export default CampaignIndex;