import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { AxiosResponse } from "axios";

export interface UserProps {
	// optional
	id?: number;
	name?: string;
	age?: number;
}

export class User {
	public events: Eventing = new Eventing();
	public sync: Sync<UserProps> = new Sync("http://localhost:3000/users");
	public attributes: Attributes<UserProps>;

	constructor(attrs: UserProps) {
		this.attributes = new Attributes<UserProps>(attrs);
	}

	get on() {
		return this.events.on;
	}

	get trigger() {
		return this.events.trigger;
	}

	get get() {
		return this.attributes.get;
	}

	set(update: UserProps): void {
		this.attributes.set(update);
		this.events.trigger("change");
	}

	fetch(): void {
		const id = this.attributes.get("id");

		if (typeof id !== "number") {
			throw new Error("Cannot fetch without an id");
		}

		this.sync.fetch(id).then((response: AxiosResponse): void => {
			this.attributes.set(response.data);
		});
	}

	save(): void {
		this.sync
			.save(this.attributes.getAll())
			.then((response: AxiosResponse) => {
				this.trigger("save");
			})
			.catch(() => {
				this.trigger("error");
			});
	}
}
/*
// TITLE : mega User class 
private data : Object to store information about a particular user
get : a single piece of info about this user
set : changes information about this user
on Registers an event handler with this object, so other parts of the app know when something changes
trigger : triggers an event to tell other parts of the app that something has changed
fetch : fetches some data from the server about a particular user
save : saves some data about this user to the server
*/

/*
// TITLE : 4 classes
// CASE 1 : represent a User and all of its data
// CASE 2 : have ability to store, retrieve and change some data
// CASE 3 : have ability to notify the rest of the app when some data is changed
// CASE 4 : persist data to an outside server, retrieve it at some future point
*/

/*
// TITLE : user class + eventing class
// OPTION 1 : Accept dependencies as second constructor argument 
//            -> not good

// OPTION 2 : Only Accept dependencies into constructor
//            Define a static class method to preconfigure
//            User and assign properties afterwards
//            -> matches에서 쓴 방법
```
export class User {

  static fromData(data: UserProps): User {
    const user = new User(new Eventing());
    user.set(data);
    return user;
  }

  private data: UserProps
  constructor(private events:Eventing) {}
} 
```
-> Event handling class가 여러개일 때 construtor를 여러개 만들어줘야 하는 번거로움이 있다.

// OPTION 3 :  Only Accept properties into constructor
//             Hard code dependencies as class properties

```
export class User {
  events: Eventing = new Eventing();

  constructor(private data: UserProps) {}
}
```
 */
