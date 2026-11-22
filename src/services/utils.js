// Utility function to pick a random subset of elements from an array using the Fisher-Yates shuffle algorithm
export function pickRandom(array, count) {
	if (array.length <= count) return array;

	const copy = [...array];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy.slice(0, count);
}
