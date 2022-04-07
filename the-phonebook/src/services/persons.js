import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
	const getData = axios.get(baseUrl);
	return getData.then((response) => response.data);
};

const create = (newObject) => {
	const addData = axios.post(baseUrl, newObject);
	return addData.then((response) => response.data);
};

const remove = (id) => {
	const deleteData = axios.delete(`${baseUrl}/${id}`);
	return deleteData.then((response) => response.data);
};

export default {
	getAll: getAll,
	create: create,
	remove: remove,
};
