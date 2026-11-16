// src/services/api.js
const BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(page = 1) {
	// Validate the page number
	if (page < 1) throw new Error("Page number must be greater than or equal to 1");
	if (page > 42) throw new Error("Page number must be less than or equal to 42");

	// Check if the data is already cached in localStorage
	const key = `characters_cache_pages`;
	const rawCache = localStorage.getItem(key);
	const cache = rawCache ? JSON.parse(rawCache) : {};

	// If the data for the requested page is already cached, return it
	if (cache[page]) return cache[page];

	// Fetch the data from the API if not cached
	const response = await fetch(`${BASE_URL}/character?page=${page}`);
	if (!response.ok) throw new Error(`Error fetching characters: ${response.statusText}`);
	const data = await response.json();

	// Cache the results in a new custom object in localStorage
	const cleanResults = data.results.map((character) => ({
		id: character.id,
		name: character.name,
	}));

	// Store the cleaned results in the cache object under the page number
	cache[page] = cleanResults;
	try {
		localStorage.setItem(key, JSON.stringify(cache));
	} catch (error) {
		console.warn("Cannot save to localStorage:", error);
	}

	// Return the cleaned array with only the necessary properties
	return cleanResults;
}

export async function getCharacterById(id) {
	// Check if the data is already cached in localStorage
	const key = `characters_cache`;
	const rawCache = localStorage.getItem(key);
	const cache = rawCache ? JSON.parse(rawCache) : {};

	// Si ya se descargó antes (solo o dentro de una página), lo devuelve al instante
	if (cache[id]) {
		console.log(`Personaje ${id} desde caché`);
		return cache[id];
	}

	const res = await fetch(`${BASE_URL}/character/${id}`);
	if (!res.ok) {
		throw new Error(`Error fetching character with id ${id}: ${res.statusText}`);
	}
	const data = await res.json();

	const cleanResults = {
		id: data.id,
		name: data.name,
		status: data.status,
		species: data.species,
		type: data.type || "Estándar",
		gender: data.gender,
		origin: data.origin?.name,
		location: data.location?.name,
	};

	// Cache the results in localStorage
	cache[id] = cleanResults;
	try {
		localStorage.setItem(key, JSON.stringify(cache));
	} catch (e) {
		console.warn("Cannot save to localStorage:", e);
	}

	// Return the cleaned object with only the necessary properties
	return cleanResults;
}
