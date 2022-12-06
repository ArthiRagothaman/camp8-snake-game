import { Coordinate } from "./types";
import { coordToId } from "./utils";

// grab DOM elements
const currentPlayerDisplay = document.querySelector(
	"#current-player"
) as HTMLElement;
const currentScoreDisplay = document.querySelector(
	"#current-score"
) as HTMLElement;
const startButton = document.querySelector("#start-button") as HTMLElement;
const resetButton = document.querySelector("#reset-button") as HTMLElement;
const gameGrid = document.querySelector("#game-grid") as HTMLElement;

// constants
const gridSize = 21;

// initialize state
type Snake = Array<Coordinate>;

const midpoint = Math.floor(gridSize / 2);
const starterSnake: Snake = [
	[midpoint - 1, midpoint],
	[midpoint, midpoint],
	[midpoint + 1, midpoint]
];

let snake: Snake = [...starterSnake];

// setup grid
gameGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
gameGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

for (let row = 0; row < gridSize; row++) {
	for (let col = 0; col < gridSize; col++) {
		// create grid element
		const gridElement = document.createElement("div");

		// generate id
		const id = coordToId([row, col]);

		// set element attributes
		gridElement.id = id;
		gridElement.style.height = `${600 / gridSize - 2}px`;
		gridElement.style.width = `${600 / gridSize - 2}px`;
		gridElement.classList.add("grid-cell");

		// add grid element to gameGrid
		gameGrid?.appendChild(gridElement);
	}
}

// show snake
for (const snakeCell of snake) {
	const id = coordToId(snakeCell);
	const snakeCellElement = document.getElementById(id) as HTMLElement;
	snakeCellElement.classList.add("snake-cell");
}

export {};
