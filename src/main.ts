import { Coordinate } from "./types";
import { coordToId, mod, toggleClassById } from "./utils";

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
const tickSpeed = 300;

// initialize state
type Snake = Array<Coordinate>;

const midpoint = Math.floor(gridSize / 2);

const starterSnake: Snake = [
	[midpoint + 1, midpoint],
	[midpoint, midpoint],
	[midpoint - 1, midpoint]
];

let snake: Snake = [...starterSnake];

// setup key listeners
document.addEventListener("keydown", (event) => {
	const key = event.code;

	switch (key) {
		case "ArrowUp":
			direction = "up";
			break;
		case "ArrowDown":
			direction = "down";
			break;
		case "ArrowLeft":
			direction = "left";
			break;
		case "ArrowRight":
			direction = "right";
			break;
	}
});

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

// function to make snake move

type Direction = "up" | "down" | "left" | "right";

let direction: Direction = "up";

function moveSnake(direction: Direction) {
	const currentHead = snake.at(-1)!;
	const [headRow, headCol] = currentHead;
	const oldTail: Coordinate = snake.shift()!;
	const oldTailId = coordToId(oldTail);

	let newHead: Coordinate, newHeadId: string;

	switch (direction) {
		case "up":
			newHead = [mod(headRow - 1, gridSize), headCol];
			snake.push(newHead);

			newHeadId = coordToId(newHead);

			toggleClassById(newHeadId, "snake-cell");
			toggleClassById(oldTailId, "snake-cell");

			break;
		case "down":
			newHead = [mod(headRow + 1, gridSize), headCol];
			snake.push(newHead);

			newHeadId = coordToId(newHead);

			toggleClassById(newHeadId, "snake-cell");
			toggleClassById(oldTailId, "snake-cell");

			break;
		case "left":
			newHead = [headRow, mod(headCol - 1, gridSize)];
			snake.push(newHead);

			newHeadId = coordToId(newHead);

			toggleClassById(newHeadId, "snake-cell");
			toggleClassById(oldTailId, "snake-cell");

			break;
		case "right":
			newHead = [headRow, mod(headCol + 1, gridSize)];
			snake.push(newHead);

			newHeadId = coordToId(newHead);

			toggleClassById(newHeadId, "snake-cell");
			toggleClassById(oldTailId, "snake-cell");

			break;
	}
}

// show snake
for (const snakeCell of snake) {
	const id = coordToId(snakeCell);
	const snakeCellElement = document.getElementById(id) as HTMLElement;
	snakeCellElement.classList.add("snake-cell");
}

function gameLoop() {
	setTimeout(() => {
		window.requestAnimationFrame(() => {
			moveSnake(direction);
			gameLoop();
		});
	}, tickSpeed);
}

gameLoop();
