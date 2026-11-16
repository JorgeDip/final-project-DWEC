// src/services/api.js
const BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(page = 1) {
	let error = null;
	if (page < 1) error = new Error("Page number must be greater than 0");
	if (page > 42) error = new Error("Page number must be less than or equal to 42");
	const response = await fetch(`${BASE_URL}/character?page=${page}`);
	if (!response.ok) error = new Error("Error fetching characters");
	const data = await response.json();
	return { results: data.results, error: error };
}

export async function getCharacterById(id) {
	const response = await fetch(`${BASE_URL}/character/${id}`);
	if (!response.ok) throw new Error("Error fetching character");
	return response.json();
}
