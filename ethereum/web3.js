import Web3 from "web3";

let web3;

//window is a global variable that is available only inside the browser.
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {

    // We are in the browser and metamask is running.
    // In that case metamask provides us a provider and we create a web3 instance using that provider.
    window.ethereum.request({method: "eth_requestAccounts"});
    web3 = new Web3(window.ethereum);
} else {

    // We are on the next server (server side rendering might be happening) *OR*
    // the user is not running metamask. In any case, window variable is not available
    const provider = new Web3.providers.HttpProvider(
        'https://sepolia.infura.io/v3/a887a7bde4ec4b2dbadc8182cbb5daa4'
    );
    web3 = new Web3(provider);
}

export default web3;