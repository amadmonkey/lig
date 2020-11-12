// app
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useLocation } from 'react-router-dom';

// data
import _ROUTES from "./routes.js";

// styles
import './App.css';

function App() {

	return (
		<div className="App">
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Header />
				<div className="content">
					<Switch>
						{Object.keys(_ROUTES).map((key, i) => {
							return <Route key={i} path={_ROUTES[key].path} component={_ROUTES[key].component} exact={_ROUTES[key].exact} />
						})}
					</Switch>
				</div>
			</BrowserRouter>
			<Footer />
		</div>
	);
}

export default App;
