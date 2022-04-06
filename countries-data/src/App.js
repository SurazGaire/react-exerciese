import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [countries, setCountries] = useState();

	const [searchKey, setSearchKey] = useState("");

	const [resultCountries, setResultCountries] = useState([]);

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountries(response.data);
			console.dir(response.data);
		});
	}, []);

	const getSearchKey = (event) => {
		event.preventDefault();
		setSearchKey(event.target.value);

		const searchResult = countries.filter((country) =>
			country.name.common.includes(event.target.value)
		);
		console.log(searchResult);
		// setResultCountries(searchResult);
	};

	return (
		<div>
			<div>
				Find Countries :{" "}
				<input value={searchKey} onChange={getSearchKey}></input>
			</div>
			<div>{resultCountries}</div>
		</div>
	);
};
export default App;
