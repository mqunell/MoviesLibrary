import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AlertContextProvider from './contexts/AlertContext';
import App from './App';
import './index.css';

ReactDOM.render(
	<AlertContextProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</AlertContextProvider>,
	document.getElementById('root')
);
