import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

//It gives access to the deployed factory contract given its address
const instance = new web3.eth.Contract(
	CampaignFactory.abi,

	//address of the most recently deployed contract
	'0x0Ef0720321b8F39E971947B191F17Ebb277DE15B'
);

export default instance;
