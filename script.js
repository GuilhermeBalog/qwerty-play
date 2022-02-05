const main = document.querySelector("#main");
const input = document.querySelector("input")

const urlParams = new URLSearchParams(window.location.search);
const queryText = urlParams.get('q');

if (queryText) {
	input.value = queryText
}

const topRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const middleRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const bottomRow = ["z", "x", "c", "v", "b", "n", "m"];

const layout = [
	topRow,
	middleRow,
	bottomRow,
	["space"]
];

function id(key) {
	return `letter-${key}`;
}

function delay(time) {
	return new Promise((res) => setTimeout(res, time));
}

function activate(key) {
	if (key == " ") key = "space";

	if (isInLayout(key)) {
		document
			.querySelector(`#${id(key)}`)
			.classList
			.add("active");
	}

}

function deactivate(key) {
	if (key == " ") key = "space";

	if (isInLayout(key)) {
		document
			.querySelector(`#${id(key)}`)
			.classList
			.remove("active");
	}
}

function isInLayout(key) {
	for (const row of layout) {
		if (row.includes(key)) return true;
	}

	return false;
}

layout.forEach((row) => {
	const keyboardRow = document.createElement("div");

	keyboardRow.classList.add("row");

	row.forEach((letter) => {
		const key = document.createElement("div");
		key.id = id(letter);
		key.innerHTML = letter;

		keyboardRow.appendChild(key);
	});

	main.appendChild(keyboardRow);
});

document.addEventListener("keydown", (e) => {
	activate(e.key);
});

document.addEventListener("keyup", (e) => {
	deactivate(e.key);
})

async function play(key) {
	activate(key)

	await delay(150)
	deactivate(key)

	await delay(100)
}

let isPlaying = false;

document.querySelector("form").addEventListener('submit', async (e) => {
	e.preventDefault()

	if (isPlaying) return
	isPlaying = true
	console.log(e)

	const value = input.value;
	const letters = value.split("");

	for (const letter of letters) {
		await play(letter.toLowerCase());
	}

	isPlaying = false
})
