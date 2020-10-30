import { User } from "./models/User";

const user = new User({ id: 1, name: "hailey", age: 28 });
user.save();
// user.fetch();

// // console.log(user.get("name"));
// // console.log(user.get("age"));

// // user.set({ name: "grandma", age: 67 });

// // console.log(user.get("name"));
// // console.log(user.get("age"));

// user.on("change", () => {
// 	console.log("change1");
// });
// user.on("change", () => {
// 	console.log("change2");
// });
// user.on("click", () => {
// 	console.log("change3");
// });

// user.trigger("change");
