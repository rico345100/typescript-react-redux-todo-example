if(!localStorage.getItem('todos-id')) {
	localStorage.setItem('todos-id', '0');
}

let id:number = +localStorage.getItem('todos-id');
export function generateId():number {
	id += 1;
	localStorage.setItem('todos-id', id.toString());

	return id;
}