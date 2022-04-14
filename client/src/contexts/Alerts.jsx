import React, { useState } from 'react';
import './Alerts.css';

/**
 * Displays alerts provided by the context. Alerts automatically remove themselves
 */
const Alerts = ({ alerts, dispatch }) => {
	if (!alerts) return <></>;

	return (
		<div id="alerts_container">
			{alerts &&
				alerts.map(({ id, text, type }) => (
					<Alert key={id} dispatch={dispatch} id={id} text={text} type={type} />
				))}
		</div>
	);
};

const Alert = ({ dispatch, id, text, type }) => {
	const [exit, setExit] = useState(false);

	setTimeout(() => {
		setExit(true);

		setTimeout(() => {
			dispatch({
				type: 'REMOVE_ALERT',
				id,
			});
		}, 500);
	}, 3500);

	return (
		<div className={`alert alert-${type} show_alert ${exit ? 'exit' : ''}`} role="alert">
			{text}
		</div>
	);
};

export default Alerts;
