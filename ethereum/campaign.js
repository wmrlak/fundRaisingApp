import web3 from './web3';
import Campaign from './build/Campaign.json';


//Given an address this return a handle to the 
//contract of that address
const campaign = (address) => {
	return new web3.eth.Contract(Campaign.abi, address);
};

export default campaign;

