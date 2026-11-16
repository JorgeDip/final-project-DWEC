// src/services/api.js
const BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(page = 1) {
	if (page < 1) throw new Error("Page number must be greater than or equal to 1");
	if (page > 42) throw new Error("Page number must be less than or equal to 42");

	// Check if the data is already cached in localStorage
	const key = `characters-page-${page}`;
	const cached = localStorage.getItem(key);
	if (cached) return JSON.parse(cached);

	const response = await fetch(`${BASE_URL}/character?page=${page}`);
	if (!response.ok) throw new Error(`Error fetching characters: ${response.statusText}`);

	const data = await response.json();
	// Cache the results in localStorage
	localStorage.setItem(key, JSON.stringify(data.results));

	return data.results;
}

export async function getCharacterById(id) {
	// Check if the data is already cached in localStorage
	const key = `character-${id}`;
	const cached = localStorage.getItem(key);
	if (cached) return JSON.parse(cached);

	const res = await fetch(`${BASE_URL}/character/${id}`);
	if (!res.ok) {
		throw new Error(`Error fetching character with id ${id}: ${res.statusText}`);
	}
	const data = await res.json();
	// Cache the results in localStorage
	localStorage.setItem(key, JSON.stringify(data));
	return data;
}
