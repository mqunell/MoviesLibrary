import React, { createContext, useContext, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import Alerts from './Alerts';

const AlertContext = createContext();

const AlertContextProvider = ({ children }) => {
	const [alerts, dispatch] = useReducer((reducerState, action) => {
		switch (action.type) {
			case 'ADD_ALERT':
				return [...reducerState, { ...action.payload }];

			case 'REMOVE_ALERT':
				return reducerState.filter((item) => item.id !== action.id);

			default:
				return reducerState;
		}
	}, []);

	return (
		<AlertContext.Provider value={dispatch}>
			{children}
			<Alerts alerts={alerts} dispatch={dispatch} />
		</AlertContext.Provider>
	);
};

/**
 * Custom hook that encapsulates the context's dispatch method and allows other components
 * to create new alerts without needing to specifiy the action or generate a unique ID
 */
export const useAlert = () => {
	// Get the full reducer from AlertContextProvider
	const dispatch = useContext(AlertContext);

	return (props) => {
		dispatch({
			type: 'ADD_ALERT',
			payload: {
				id: uuid(),
				...props,
			},
		});
	};
};

export default AlertContextProvider;
