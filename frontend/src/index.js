import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import App from './App';
import { ApolloClient, createHttpLink, ApolloProvider, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

const link = createHttpLink({
	uri: 'http://localhost:4000',
	credentials: 'same-origin'
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = Cookies.get('authorization');
	// return the headers to the context so httpLink can read them
	return {
	  headers: {
		...headers,
		authorization: token ? token : "",
	  }
	}
});

const client = new ApolloClient({
	cache: new InMemoryCache({resultCaching: false}),
	link: authLink.concat(link)
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
  document.getElementById('root')
);
