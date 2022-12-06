import { Coordinate } from "./types";

export function coordToId(coord: Coordinate): string {
	const [row, col] = coord;

	return `${row}-${col}`;
}

export function idToCoord(id: string): Coordinate {
	const [row, col] = id.split("-").map((elem) => Number(elem));

	return [row, col];
}

export function mod(n: number, m: number) {
	return ((n % m) + m) % m;
}

export function toggleClassById(id: string, className: string) {
	const element = document.getElementById(id) as HTMLElement;
	element.classList.toggle(className);
}
