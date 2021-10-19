import React, { useContext } from 'react';
import { AlertContext } from '../contexts/AlertContext';

const Alerts = () => {
	const { alerts } = useContext(AlertContext);

	return (
		<div id="alerts_container">
			{alerts.map(({ id, text, type }) => (
				<div key={id} className={`alert alert-${type} show_alert`} role="alert">
					{text}
				</div>
			))}
		</div>
	);
};

export default Alerts;
