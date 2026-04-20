export interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    image: string
}

export interface ICharactersResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: ICharacter[];
}