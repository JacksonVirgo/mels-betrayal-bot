const adjectives: string[] = [
	'magical',
	'happy',
	'mysterious',
	'colorful',
	'whimsical',
	'adventurous',
	'playful',
	'fantastic',
	'enchanting',
	'curious',
	'brilliant',
	'daring',
	'charming',
	'glowing',
	'vibrant',
	'glittering',
	'dazzling',
	'radiant',
	'captivating',
	'mesmerizing',
];
const nouns: string[] = [
	'donkey',
	'unicorn',
	'dragon',
	'mermaid',
	'wizard',
	'pixie',
	'phoenix',
	'goblin',
	'centaur',
	'sorcerer',
	'fairy',
	'unicorn',
	'nymph',
	'warlock',
	'genie',
	'griffin',
	'troll',
	'elf',
	'witch',
	'knight',
];

export function getRandomChannelName(): string {
	const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	const noun = nouns[Math.floor(Math.random() * nouns.length)];
	return `${adjective}-${noun}`;
}
