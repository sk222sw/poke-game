const base = "https://pokeapi.co/api/v2";

export function getPokemon(id) {
  return fetch(`${base}/pokemon/${id}`);
}
