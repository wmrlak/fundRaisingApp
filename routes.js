//This file has dual purpose:
// A) Allows navigation between different pages.
// B) Allows set up of dynamic routing.


//A function is returned by the require statement and is invoked immediately after.
const routes = require('next-routes')();


//------Dynamic Routing------//
//Set routes that have custom token here (dynamic routing),
//when a pattern like this is met the user is displayed the campaigns/show component
//:address indicates a wildcard and address is passed into the new component
routes
    .add('/campaigns/new', '/campaigns/new')                //this route specifically instructs to go to the new campaign page, it needs to be placed first, otherwise the second one will direct to the show page because of the wildcard
    .add('/campaigns/:address', '/campaigns/show')
    .add('/campaigns/:address/requests', '/campaigns/requests/index')
    .add('/campaigns/:address/requests/new', '/campaigns/requests/new');

//------Page navigation------//
// Exports helpers for navigation and contains linktags to display inside react components
module.exports = routes;

