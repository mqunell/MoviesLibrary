import React from 'react';

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
	setTimeout(() => {
		dispatch({
			type: 'REMOVE_ALERT',
			id,
		});
	}, 4000);

	return (
		<div className={`alert alert-${type} show_alert`} role="alert">
			{text}
		</div>
	);
};

export default Alerts;
