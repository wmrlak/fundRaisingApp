import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

/**
 * Adjusts the layout of all the components
 *
 * @param props Contains the contents of a react component.
 * @returns {JSX.Element}
 * @constructor
 */
const Layout = (props) => {
	return (
		
		// Use a container here instead of <div></div> so content doesn't expand from side to side of the page
		// There is margin left and right
		<Container>
		
			{/*The link tage below will go to the <head> tag of the html document.
			Normally link tags go there.
			We can use this to add other information here, e.g. metatags */}

			<Head>
				<link
					rel="stylesheet" 
					href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
				/>
			</Head>

			{/*Place the header of the page*/}
			<Header />

			{/*Place the content*/}
			{props.children}

		</Container>
	);
};

export default Layout;