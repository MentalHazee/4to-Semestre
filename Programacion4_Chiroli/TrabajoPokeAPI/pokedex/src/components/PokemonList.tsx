import type { PokemonListItem } from "../types/pokemon";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
    pokemons: PokemonListItem[];
    selected: string | null;
    onSelect: (name: string) => void;
}

export default function PokemonList({ pokemons, selected, onSelect }: PokemonListProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {pokemons.map((pokemon) => (
                <PokemonCard 
                key={pokemon.name}
                name={pokemon.name}
                isSelected={selected === pokemon.name}
                onSelect={onSelect}
                />
            ))}
        </div>
    );
}
