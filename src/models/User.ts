import axios, { AxiosResponse } from "axios";

interface UserProps {
	// optional
	id?: number;
	name?: string;
	age?: number;
}

type Callback = () => void;

export class User {
	events: { [key: string]: Callback[] } = {};

	constructor(private data: UserProps) {}

	get(propName: string): number | string {
		return this.data[propName];
	}

	set(update: UserProps): void {
		Object.assign(this.data, update);
	}

	on(eventName: string, callback: Callback): void {
		const handlers = this.events[eventName] || [];
		handlers.push(callback);
		this.events[eventName] = handlers;
	}

	trigger(eventName: string): void {
		const handlers = this.events[eventName];

		if (!handlers || !handlers.length) {
			return;
		}

		handlers.forEach((callback) => callback());
	}

	fetch(): void {
		axios
			.get(`http://localhost:3000/users/${this.get("id")}`)
			.then((res: AxiosResponse): void => {
				this.set(res.data);
			});
	}

	save(): void {
		const id = this.get("id");
		if (id) {
			axios.put(`http://localhost:3000/users/${id}`, this.data);
		} else {
			axios.post(`http://localhost:3000/users`, this.data);
		}
	}
}
/*
class User
private data : Object to store information about a particular user
get : a single piece of info about this user
set : changes information about this user
on Registers an event handler with this object, so other parts of the app know when something changes
trigger : triggers an event to tell other parts of the app that something has changed
fetch : fetches some data from the server about a particular user
save : saves some data about this user to the server
*/
