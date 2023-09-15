const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//delete build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

//read contract from contracts folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');

//read the source code of the contract
const source = fs.readFileSync(campaignPath, 'utf8');

//specify the expected JSON formatted input, specifying language, sources and output selection
const input = {
    language: "Solidity",
    sources: {
        "Campaign.sol": {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

//compile the source code using solc compiler, get the contracts property
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Campaign.sol"];
//console.log(output);

//create build directory
fs.ensureDirSync(buildPath);

//write output to a file
//fs.outputJsonSync(path.resolve(buildPath, 'outputSample.json'), output);

//loop over output, get every contract and write it in the build folder in its own file
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}