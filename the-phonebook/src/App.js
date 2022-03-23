import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{
			name: "Peter Parker",
			id: 1,
		},
	]);
	const [newName, setNewName] = useState([""]);

	const displayText = (e) => {
		e.preventDefault();
		setNewName(e.target.value);
	};

	const addPerson = () => {
		// // console.log(newName);
		// let nameMatch = 0;
		// for (let i = 0; i < persons.length; i++) {
		// 	let currElement = persons[i];
		// 	// existArray.push(currElement.name);
		// 	// console.log(existArray.indexOf(newName));
		// 	if (currElement.name === newName) {
		// 		// console.log("Name already Exist");
		// 		alert("Name already exists");
		// 		nameMatch = 1;
		// 		break;
		// 	}
		// }
		// // let objectString = JSON.stringify(persons);
		// if (!nameMatch) {
		// 	// console.log("not exists");
		// 	const myObject = {
		// 		name: newName,
		// 		id: persons.length + 1,
		// 	};
		// 	setPersons(persons.concat(myObject));
		// 	setNewName("");
		// }
		let nameMatch = persons.some((person) => person.name === newName);
		// console.log(nameMatch);
		if (!nameMatch) {
			const myObject = {
				name: newName,
				id: persons.length + 1,
			};
			setPersons(persons.concat(myObject));
			setNewName("");
		} else {
			alert(newName + "is already added to the Phonebook.");
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				name : <input onChange={displayText} value={newName} />
			</div>
			<div>
				<button onClick={addPerson}>Add</button>
			</div>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<h4 key={person.id}>{person.name}</h4>
			))}
		</div>
	);
};

export default App;
