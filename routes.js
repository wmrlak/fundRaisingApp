
//Set up dynamic routes here


//A function is returned by the require statement and is invoked immediately after requiring it.
const routes = require('next-routes')();


//Set routes that have custom token here, 
//when a pattern like this is met the user is displayed the CampaignShow component
//:address indicates a wildcard
routes
.add('/campaigns/new', '/campaigns/new')
.add('/campaigns/:address', '/campaigns/show')
.add('/campaigns/:address/requests', '/campaigns/requests/index')
.add('/campaigns/:address/requests/new', '/campaigns/requests/new');

//exports helpers for navigation and contains
//linktags to display inside react components
module.exports = routes;

