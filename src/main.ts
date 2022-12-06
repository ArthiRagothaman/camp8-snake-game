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
const tickSpeed = 300;

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

// function to make snake move

type Direction = "up" | "down" | "left" | "right";

let direction: Direction = "up";

function moveSnake(direction: Direction) {
	switch (direction) {
		case "up":
			const currentHead = snake.at(-1)!;
			// const [headRow, headCol] = currentHead;
			const headRow = currentHead[0];
			const headCol = currentHead[1];

			const newHead: Coordinate = [headRow - 1, headCol];
			snake.push(newHead);

			const newHeadId = coordToId(newHead);

			const newHeadElement = document.getElementById(
				newHeadId
			) as HTMLElement;

			newHeadElement.classList.add("snake-cell");

			const oldTail: Coordinate = snake.shift()!;

			const oldTailId = coordToId(oldTail);

			const oldTailElement = document.getElementById(
				oldTailId
			) as HTMLElement;

			oldTailElement.classList.remove("snake-cell");

			break;
		case "down":
			// do something
			break;
		case "left":
			// do something
			break;
		case "right":
			// do something
			break;
		default:
			console.log(`wtf? direction is: ${direction}`);
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
