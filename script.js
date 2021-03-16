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

layout.forEach((row) => {
	const keyboardRow = document.createElement("div");

	keyboardRow.classList.add("row");

	row.forEach((letter) => {
		const key = document.createElement("div");
		key.id = "letter-" + letter;
		key.innerHTML = letter;

		keyboardRow.appendChild(key);
	});

	main.appendChild(keyboardRow);
});

document.addEventListener("keyup", (e) => {
	play(e.key);
});

function isInLayout(key) {
	for (row of layout) {
		if (row.includes(key)) return true;
	}

	return false;
}

function play(key) {
	return new Promise((res) => {
		if (key == " ") key = "space";

		if (isInLayout(key)) {
			document.querySelector(`#letter-${key}`).classList.add("active");

			setTimeout(() => {
				document.querySelector(`#letter-${key}`).classList.remove("active");

				delay().then(() => {
					res();
				});
			}, 100);
		}
	});
}

function delay(time = 50) {
	return new Promise((res) => setTimeout(res, time));
}

document.querySelector("form").addEventListener('submit', async (e) => {
	e.preventDefault()

	const value = input.value;
	const letters = value.split("");

	for (const letter of letters) {
		await play(letter.toLowerCase());
	}
})
