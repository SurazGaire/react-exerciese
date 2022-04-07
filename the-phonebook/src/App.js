import { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState([""]);
	const [newNumber, setNewNumber] = useState([]);

	const [searchKey, setSearchKey] = useState("");

	const [searchResult, setSearchResult] = useState([]);

	// let newNumber = 0;

	useEffect(() => {
		axios.get("http://localhost:3001/persons").then((response) => {
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

	const getSearchKey = (event) => {
		event.preventDefault();
		setSearchKey(event.target.value);

		const resultsSearch = persons.filter((p) =>
			p.name.includes(event.target.value)
		);
		setSearchResult(resultsSearch);
	};

	const addPerson = () => {
		let nameMatch = persons.some((person) => person.name === newName);
		// console.log(nameMatch);
		if (!nameMatch) {
			const myObject = {
				name: newName,
				number: newNumber,
			};
			axios.post("http://localhost:3001/persons", myObject).then((response) => {
				console.log(response.data);
				persons(response.data);
			});
			setPersons(persons.concat(myObject));
			console.log(persons);
			setNewName("");
		} else {
			alert(`${newName} is already added to the Phonebook.`);
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				Filter shown with :
				<input onChange={getSearchKey} value={searchKey}></input>
			</div>
			<h1>Add New Person</h1>
			<p>
				Name : <input onChange={displayText} value={newName} />
			</p>
			<p>
				Number : <input onChange={displayNumber} value={newNumber} />
			</p>
			<div>
				<button onClick={addPerson}>Add</button>
			</div>
			<h2>Numbers</h2>
			{searchResult.length === 1 ? (
				<div>
					<h3>Your search results: </h3>
					<h4>
						{searchResult.map((rs, index) => (
							<span key={index}>
								{rs.name} : {rs.number}
							</span>
						))}
					</h4>
				</div>
			) : (
				<div>
					<ul>
						{persons.map((p, index) => (
							<li key={index}>
								{p.name} : {p.number}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default App;
