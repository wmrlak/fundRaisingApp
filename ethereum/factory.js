import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

//It gives access to the deployed factory contract given its address
const instance = new web3.eth.Contract(
	CampaignFactory.abi,

	//address of the most recently deployed contract
	'0x3D2b4E0C81B1D5Fb7347e5034483F131032bAa82'
);

export default instance;
