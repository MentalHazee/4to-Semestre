// Cada item que devuelve el endpoint de lista
export interface PokemonListItem {
    name: string;
    url: string;
}

// Respuesta completa del endpoint de lista
export interface PokemonListResponse {
    count: number;
    results: PokemonListItem[];
}

// Un tipo de pokémon (fire, water, grass...)
export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

// Una estadística base (hp, attack, defense...)
export interface PokemonStat {
    base_stat: number;
    stat: {
        name: string;
    };
}

// Las imágenes del pokémon
export interface PokemonSprites {
    front_default: string | null; //tiene un null por si no tiene la imagen
    front_shiny: string | null;
}

// Detalle completo — respuesta del endpoint /pokemon/{name}
export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    types: PokemonType[];
    stats: PokemonStat[];
    sprites: PokemonSprites;
}
