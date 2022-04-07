import { useState, useEffect } from "react";
import personService from "./services/persons";
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState([""]);
	const [newNumber, setNewNumber] = useState([]);

	const [searchKey, setSearchKey] = useState("");

	const [searchResult, setSearchResult] = useState([]);

	const [errorMessage, setErrorMessage] = useState(null);

	// let newNumber = 0;

	useEffect(() => {
		personService.getAll().then((initialData) => {
			setPersons(initialData);
		});
	}, []);

	const Notification = ({ message }) => {
		const errorStyle = {
			color: "red",
			background: "lightgrey",
			fontSize: 20,
			borderStyle: "solid",
			borderRadius: 5,
			padding: 10,
			marginBottom: 10,
		};
		if (message === null) {
			return null;
		} else {
			return <div style={errorStyle}>{message}</div>;
		}
	};

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
				setErrorMessage(`${newName} added Sucessful`);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			});
			setNewName("");
		} else {
			if (
				window.confirm(
					`Do you want to replace ${newName} old number with the new one?`
				)
			) {
				const findId = persons.filter((p) => p.name === newName);
				findId.map((person) => updateNumber(person.id));
			}
		}
	};

	const updateNumber = (id) => {
		console.log(id);
		const personToEdit = persons.find((p) => p.id === id);
		const editedObject = { ...personToEdit, name: newName, number: newNumber };

		personService.update(id, editedObject).then((returnedPerson) => {
			return setPersons(
				persons.map((person) => (person.id !== id ? person : returnedPerson))
			);
		});
	};

	const confirmDelete = (id) => {
		if (window.confirm("Do you really want to delete this data?")) {
			personService.remove(id).then((response) => {
				const afterDelete = persons.filter((person) => person.id !== id);
				setPersons(afterDelete);
			});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={errorMessage} />
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
