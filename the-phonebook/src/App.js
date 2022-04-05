import { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
	const [persons, setPersons] = useState();
	const [newName, setNewName] = useState([""]);
	const [newNumber, setNewNumber] = useState([]);

	// let searchKey = "";

	// let newNumber = 0;

	useEffect(() => {
		axios.get("http://localhost:3001/persons").then((response) => {
			console.log(response);
			setPersons(response.data);
		});
	}, []);

	const displayNumber = (e) => {
		e.preventDefault();
		// newNumber = e.target.value;
		setNewNumber(e.target.value);
	};

	const displayText = (e) => {
		e.preventDefault();
		setNewName(e.target.value);
	};

	// const filterText = (e) => {
	// 	e.preventDefault();
	// 	searchKey = e.target.value;
	// 	searchResult = persons.filter((person) => person.name.includes(searchKey));
	// 	// console.log(searchResult);
	// };

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
				number: newNumber,
				id: persons.length + 1,
			};
			setPersons(persons.concat(myObject));
			setNewName("");
		} else {
			alert(`${newName} is already added to the Phonebook.`);
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				Filter shown with :<input></input>
			</div>
			<h1>Add a New</h1>
			<div>
				Name : <input onChange={displayText} value={newName} />
			</div>
			<div>
				Number : <input onChange={displayNumber} value={newNumber} />
			</div>
			<div>
				<button onClick={addPerson}>Add</button>
			</div>
			<h2>Numbers</h2>
			<div></div>
		</div>
	);
};

export default App;
