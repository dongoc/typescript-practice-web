// CASE 3 : have ability to notify the rest of the app when some data is changed

type Callback = () => void;

export class Eventing {
	events: { [key: string]: Callback[] } = {};

	on = (eventName: string, callback: Callback): void => {
		const handlers = this.events[eventName] || [];
		handlers.push(callback);
		this.events[eventName] = handlers;
	};

	trigger = (eventName: string): void => {
		const handlers = this.events[eventName];

		if (!handlers || !handlers.length) {
			return;
		}

		handlers.forEach((callback) => callback());
	};
}
