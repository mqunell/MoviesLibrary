import React, { createContext, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

export const AlertContext = createContext();

const AlertContextProvider = ({ children }) => {
	const [alerts, setAlerts] = useState([]); // [{ text, type }]

	const alertsRef = useRef(alerts);
	alertsRef.current = alerts;

	const addAlert = (text, type) => {
		const id = uuid();

		setAlerts([...alertsRef.current, { id, text, type }]);

		setTimeout(() => {
			setAlerts(alertsRef.current.filter((alert) => alert.id !== id));
		}, 4000);
	};

	return (
		<AlertContext.Provider value={{ alerts, addAlert }}>{children}</AlertContext.Provider>
	);
};

export default AlertContextProvider;
