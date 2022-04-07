import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const App = () => {
	const [countries, setCountries] = useState();

	const [searchKey, setSearchKey] = useState("");

	const [resultCountries, setResultCountries] = useState([
		// { name: { common: "Many search Results" } },
	]);

	const [singleResult, setSingleResult] = useState([]);

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountries(response.data);
		});
	}, []);

	const getSearchKey = (event) => {
		event.preventDefault();
		setSearchKey(event.target.value);

		const searchResult = countries.filter((country) =>
			country.name.common.includes(event.target.value)
		);
		console.log(searchResult);
		if (searchResult.length === 1) {
			setResultCountries(searchResult);
			setSingleResult(searchResult);
			console.log("only 1 country");
		} else if (searchResult.length > 10) {
			const tooMany = "Too many results,use other filter";
			setResultCountries([{ name: { common: tooMany } }]);
		} else {
			setResultCountries(searchResult);
		}
	};

	return (
		<div>
			<div>
				Find Countries :{" "}
				<input value={searchKey} onChange={getSearchKey}></input>
			</div>
			{singleResult.length === 1 ? (
				<div>
					<h1>{resultCountries[0].name.common}</h1>
					<p>{resultCountries[0].capital}</p>
					<p>{resultCountries[0].area}</p>
					<h4>Continent :</h4>
					<ul>
						{resultCountries.map((continent, index) => (
							<li key={index}>{continent.continents}</li>
						))}
					</ul>
					<img src={resultCountries[0].flags.png} />
				</div>
			) : (
				<div>
					<ul>
						{resultCountries.map((rc, index) => (
							<Country key={index} country={rc} />
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
export default App;
