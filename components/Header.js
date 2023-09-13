import React from 'react';
import { Menu } from 'semantic-ui-react';

//Create link tags for users to navigate themselves
import { Link } from '../routes';

const Header = () => {
	return (
		<Menu style={{ marginTop: '10px'}}>
			
			<Link legacyBehavior route="/">
				{/*anchor tags give the right click menu and options to open to new tag */}
				<a className="item">
					CrowdCoin
				</a>
			</Link>
			
			<Menu.Menu position="right">
				<Link legacyBehavior route="/">
					<a className="item">
						Campaigns
					</a>
				</Link>
			
				<Link legacyBehavior route="/campaigns/new">
					<a className="item">
						+
					</a>
				</Link>
			
			</Menu.Menu>
		</Menu>
	);
};

export default Header;