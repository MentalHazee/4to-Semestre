import { useEffect, useState } from "react";
import type { PokemonDetail } from "../types/pokemon";
import StatBar from "./StatBar";

interface PokemonCardProps {
  name: string;
  isSelected: boolean;
  onSelect: (name: string) => void;
}

export default function PokemonCard({ name, isSelected, onSelect }: PokemonCardProps) {
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const data: PokemonDetail = await response.json();
        setDetail(data);
      } catch (error) {
        console.error(`Error al cargar ${name}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [name]);

  const typeColors: Record<string, string> = {
    fire: "bg-orange-400",
    water: "bg-blue-400",
    grass: "bg-green-400",
    electric: "bg-yellow-300",
    psychic: "bg-pink-400",
    ice: "bg-cyan-300",
    dragon: "bg-indigo-500",
    dark: "bg-gray-700",
    fairy: "bg-pink-300",
    normal: "bg-gray-400",
    fighting: "bg-red-600",
    flying: "bg-sky-300",
    poison: "bg-purple-400",
    ground: "bg-yellow-600",
    rock: "bg-yellow-800",
    bug: "bg-lime-400",
    ghost: "bg-purple-700",
    steel: "bg-slate-400",
  };

  if (loading) {
    return <div className="bg-gray-200 animate-pulse rounded-xl h-48" />;
  }

  return (
    <div
      onClick={() => onSelect(name)}
      className={`
        h-60 cursor-pointer rounded-xl p-4 flex flex-col items-center gap-2
        transition-all duration-200
        ${isSelected
          ? "h-120 bg-yellow-100 border-2 border-yellow-400 scale-105 shadow-lg"
          : "bg-white border border-gray-200 hover:shadow-md"
        }
      `}
    >
      {detail?.sprites.front_default ? (
        <img
          src={detail.sprites.front_default}
          alt={name}
          className="w-24 h-24"
        />
      ) : (
        <div className="w-24 h-24 bg-gray-100 rounded-full" />
      )}

      <p className="font-semibold capitalize text-gray-800">{name}</p>

      <div className="flex gap-1">
        {detail?.types.map((t) => (
          <span
            key={t.slot}
            className={`text-xs text-white px-2 py-0.5 rounded-full capitalize ${typeColors[t.type.name] ?? "bg-gray-400"}`}
          >
            {t.type.name}
          </span>
        ))}
      </div>

      {isSelected && detail && (
        <div className="w-full mt-2 border-t pt-2 flex flex-col gap-2">
          {detail.stats.map((s) => (
            <StatBar
              key={s.stat.name}
              name={s.stat.name}
              value={s.base_stat}
        />
    ))}
  </div>
)}
    </div>
  );
}