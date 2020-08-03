/**
 * Singleton class for displaying alerts using the div#alert in App.js
 * Import the class and use with "Alert.get().show(...)"
 *
 * todo: Consider changing to the following:
 * static instance = Alert.instance || new Alert()  ->  Alert.instance.show(...)
 *
 * todo: Private constructor to prevent public instantiation?
 */
export default class Alert {
	static instance = null

	timer = null;

	static get() {
		if (!this.instance) {
			this.instance = new Alert()
		}

		return this.instance
	}

	/**
	 * Display the alert
	 * @param {string} text The text to show in the alert
	 * @param {string} type The type of Bootstrap alert (primary, success, danger, info, etc)
	 * @param {boolean} autoHide Automatically hide the alert or not
	 */
	show(text, type, autoHide) {
		const element = document.getElementById('alert')

		element.innerHTML = text
		element.className = `alert alert-${type} show_alert`

		if (autoHide) {
			clearTimeout(this.timer)

			this.timer = setTimeout(() => {
				element.className = 'alert'
			}, 3000)
		}
	}
}
