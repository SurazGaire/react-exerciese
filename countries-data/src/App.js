import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [countires, setCountries] = useState();

	const [searchKey, setSearchKey] = useState("");

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountries(response);
			console.log(response.data);
		});
	}, []);

	const getSearchKey = (event) => {
		event.preventDefault();
		setSearchKey(event.target.value);
	};

	return (
		<div>
			<div>
				Find Countries : <input onChange={getSearchKey}></input>
			</div>
		</div>
	);
};
export default App;
