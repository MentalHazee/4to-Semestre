import type { ICharactersResponse } from "../types/ICharacter";

export const getCharacters = async (): Promise<ICharactersResponse> => {
    const res = await fetch("https://rickandmortyapi.com/api/character");

    if (!res.ok) {
        throw new Error("Error al obtener los personajes");
    }

    return res.json();
}