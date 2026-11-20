// src/services/api.js
const BASE_URL = "https://rickandmortyapi.com/api";
const FILE_DATA_URL = "src/data/characters_enriched.json";

export async function getCharacters(page = 1) {
	// Validate the page number
	if (page < 1) throw new Error("Page number must be greater than or equal to 1");
	if (page > 42) throw new Error("Page number must be less than or equal to 42");

	// Check if the data is already cached in localStorage
	const key = "characters_cache_pages_v2"; //In theory, it should show the location and state of the card for the character.
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
		status: character.status,
		species: character.species,
		origin: character.origin?.name,
		location: character.location?.name,
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

	// If the data for the requested character is already cached, return it
	if (cache[id]) {
		console.log(`Fetching character with id ${id} from cache`);
		return cache[id];
	}

	const res = await fetch(`${BASE_URL}/character/${id}`);
	if (!res.ok) {
		throw new Error(`Error fetching character with id ${id}: ${res.statusText}`);
	}
	const data = await res.json();

	// Fetch enriched data from the local JSON file
	const getEnrichedData = await fetch(`${FILE_DATA_URL}`);
	if (!getEnrichedData.ok) {
		throw new Error(`Error fetching enriched data: ${getEnrichedData.statusText}`);
	}
	const enrichedData = await getEnrichedData.json();
	const enrichedCharacterData = enrichedData.find((char) => char.id === id);

	const cleanResults = {
		id: data.id,
		name: data.name,
		status: data.status,
		species: data.species,
		type: data.type || "Estándar",
		gender: data.gender,
		origin: data.origin?.name,
		location: data.location?.name,
		episode: enrichedCharacterData.episode || [],
		description: enrichedCharacterData.description || "No description available",
		current_residence: enrichedCharacterData.current_residence,
		mental_state: enrichedCharacterData.mental_state,
		citadel_status: enrichedCharacterData.citadel_status,
		age: enrichedCharacterData.age,
		threat_level: enrichedCharacterData.threat_level,
		related_character_ids: enrichedCharacterData.related_character_ids || [],
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

export async function getCharactersFromFile() {
	// Check if the data is already cached in localStorage
	const key = `characters_cache_file`;
	const rawCache = localStorage.getItem(key);
	const cache = rawCache ? JSON.parse(rawCache) : {};

	if (cache["data"]) {
		console.log(`Fetching characters from cache`);
		return cache["data"];
	}

	const res = await fetch(`${FILE_DATA_URL}`);
	if (!res.ok) {
		throw new Error(`Error fetching characters from file : ${res.statusText}`);
	}
	const data = await res.json();
	cache["data"] = data;
	// Cache the results in localStorage
	try {
		localStorage.setItem(key, JSON.stringify(cache));
	} catch (e) {
		console.warn("Cannot save to localStorage:", e);
	}

	// Return the cleaned object with only the necessary properties
	return data;
}
