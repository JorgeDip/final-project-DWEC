// src/services/api.js
const BASE_URL = "https://rickandmortyapi.com/api";
const FILE_DATA_URL = "src/data/characters_enriched.json";

function readCache(key) {
	try {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}

function writeCache(key, cache) {
	try {
		localStorage.setItem(key, JSON.stringify(cache));
	} catch (e) {
		console.warn("Cannot save to localStorage:", e);
	}
}

export async function getCharacters(page = 1) {
	// Validate the page number
	if (page < 1) throw new Error("Page number must be greater than or equal to 1");
	if (page > 42) throw new Error("Page number must be less than or equal to 42");

	// Check if the data is already cached in localStorage
	const key = "characters_cache_pages_v2"; //In theory, it should show the location and state of the card for the character.
	const cache = readCache(key);

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

	writeCache(key, cache);

	// Return the cleaned array with only the necessary properties
	return cleanResults;
}

export async function getCharacterById(id) {
	const key = `characters_cache`;
	const numericId = Number(id);

	const cached = readCache(key)[numericId];
	if (cached) {
		console.log(`Fetching character with id ${numericId} from cache`);
		return cached;
	}

	const res = await fetch(`${BASE_URL}/character/${numericId}`);
	if (!res.ok) {
		throw new Error(`Error fetching character with id ${numericId}: ${res.statusText}`);
	}
	const data = await res.json();

	const enrichedRes = await fetch(`${FILE_DATA_URL}`);
	if (!enrichedRes.ok) {
		throw new Error(`Error fetching enriched data: ${enrichedRes.statusText}`);
	}
	const enrichedData = await enrichedRes.json();
	const enriched = enrichedData.find((char) => char.id === numericId) ?? {};

	const cleanResults = {
		id: data.id,
		name: data.name,
		status: data.status,
		species: data.species,
		type: data.type || "Standard",
		gender: data.gender,
		origin: data.origin?.name,
		location: data.location?.name,
		episode: enriched.episode || [],
		description: enriched.description || "No description available",
		current_residence: enriched.current_residence,
		mental_state: enriched.mental_state,
		citadel_status: enriched.citadel_status,
		age: enriched.age,
		threat_level: enriched.threat_level,
		related_character_ids: enriched.related_character_ids || [],
	};

	const freshCache = readCache(key);
	freshCache[numericId] = cleanResults;
	writeCache(key, freshCache);

	return cleanResults;
}

export async function getCharactersFromFile() {
	// Check if the data is already cached in localStorage
	const key = `characters_cache_file`;
	const cache = readCache(key);

	if (cache["data"]) return cache["data"];

	const res = await fetch(`${FILE_DATA_URL}`);
	if (!res.ok) {
		throw new Error(`Error fetching characters from file : ${res.statusText}`);
	}
	const data = await res.json();

	cache["data"] = data;
	// Cache the results in localStorage
	writeCache(key, cache);

	// Return the cleaned object with only the necessary properties
	return data;
}

export async function getEpisodeById(id) {
	// Check if the data is already cached in localStorage
	const key = `episodes_cache`;
	const numericId = Number(id);
	const cached = readCache(key)[numericId];
	if (cached) {
		console.log(`Fetching episode with id ${numericId} from cache`);
		return cached;
	}

	const res = await fetch(`${BASE_URL}/episode/${numericId}`);
	if (!res.ok) {
		throw new Error(`Error fetching episode with id ${numericId}: ${res.statusText}`);
	}
	const data = await res.json();

	const freshCache = readCache(key);
	freshCache[numericId] = data;
	writeCache(key, freshCache);

	return data;
}
