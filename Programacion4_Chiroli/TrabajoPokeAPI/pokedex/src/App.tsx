import { useEffect, useState } from "react";
import type { PokemonListItem, PokemonListResponse } from "./types/pokemon";
import PokemonList from "./components/PokemonList";

export default function App() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: PokemonListResponse = await response.json();
        setPokemons(data.results);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const handleSelect = (name: string) => {
    setSelected((prev) => (prev === name ? null : name));
  };

  const filtrarPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500 animate-pulse">Cargando Pokédex...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 font-semibold">Algo salió mal</p>
          <p className="text-gray-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grey-900">
      <header className="bg-red-500 text-white py-6 shadow-md">
        <h1 className="text-3xl font-bold text-center tracking-wide">
          POKEDEX
        </h1>
      </header>

      {/*Buscador*/}
      <div className="flex justify-center px-4 py-4">
        <input
          type="text"
          placeholder="Buscar pokémon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="
            w-full max-w-md px-4 py-2 rounded-full border border-gray-300
            shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400
            text-gray-50
          "
        />
      </div>

      {/*Sin resultados*/}
      {filtrarPokemons.length === 0 && (
        <p className="text-center text-gray-400 mt-8">
          No se encontró ningún pokemon con ese nombre.
        </p>
      )}

      <main>
        <PokemonList
          pokemons={filtrarPokemons}
          selected={selected}
          onSelect={handleSelect}
        />
      </main>
    </div>
  );
}