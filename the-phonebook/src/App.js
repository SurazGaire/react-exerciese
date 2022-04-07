import { useState, useEffect } from "react";
import personService from "./services/persons";
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState([""]);
	const [newNumber, setNewNumber] = useState([]);

	const [searchKey, setSearchKey] = useState("");

	const [searchResult, setSearchResult] = useState([]);

	// let newNumber = 0;

	useEffect(() => {
		personService.getAll().then((initialData) => {
			setPersons(initialData);
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
			personService.create(myObject).then((response) => {
				const allData = persons.concat(response);
				setPersons(allData);
			});
			setNewName("");
		} else {
			alert(`${newName} is already added to the Phonebook.`);
		}
	};

	const confirmDelete = (id) => {
		if (window.confirm("Do you really want to delete this data?")) {
			console.log(`The content of this ${id} needs to be deleted`);
			personService.remove(id).then((response) => {
				const afterDelete = persons.filter((person) => person.id !== id);
				setPersons(afterDelete);
			});
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
								<button
									onClick={() => {
										confirmDelete(p.id);
									}}
								>
									{" "}
									Delete{" "}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default App;
