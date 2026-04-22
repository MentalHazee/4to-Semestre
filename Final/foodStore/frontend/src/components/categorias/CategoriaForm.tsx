import { useState } from "react";
import type { Categoria } from "../../types/categoria.types";

interface Props {
  initialData?: Categoria;
  onSubmit: (data: { nombre: string }) => void;
}

const CategoriaForm = ({ initialData, onSubmit }: Props) => {
  const [nombre, setNombre] = useState(initialData?.nombre || "");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    setError("");
    onSubmit({ nombre });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border p-2 rounded"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button className="bg-green-500 text-white p-2 rounded">
        Guardar
      </button>
    </form>
  );
};

export default CategoriaForm;