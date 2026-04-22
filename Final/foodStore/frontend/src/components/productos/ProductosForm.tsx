import { useState } from "react";
import { useCategorias } from "../../hooks/useCategorias";
import { useIngredientes } from "../../hooks/useIngredientes";
import type { Producto, ProductoCreate } from "../../types/producto.types";

interface Props {
  initialData?: Producto | null;
  onSubmit: (data: ProductoCreate) => void;
}

const ProductoForm = ({ initialData, onSubmit }: Props) => {
  const { data: categorias } = useCategorias();
  const { data: ingredientes } = useIngredientes();

  const [nombre, setNombre] = useState(initialData?.nombre || "");
  const [precio, setPrecio] = useState(initialData?.precio_base || 0);
  const [categoriasIds, setCategoriasIds] = useState<number[]>(
    initialData?.categorias?.map((c) => c.id) || []
  );
  const [ingredientesIds, setIngredientesIds] = useState<number[]>(
    initialData?.ingredientes?.map((i) => i.id) || []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      nombre,
      precio_base: precio,
      categorias_ids: categoriasIds,
      ingredientes_ids: ingredientesIds,
    });
  };

  const toggleCategoria = (id: number) => {
    setCategoriasIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleIngrediente = (id: number) => {
    setIngredientesIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        placeholder="Nombre"
        onChange={(e) => setNombre(e.target.value)}
        className="border p-2"
      />

      <input
        type="number"
        placeholder="Precio"
        onChange={(e) => setPrecio(Number(e.target.value))}
        className="border p-2"
      />

      <div>
        <h3>Categorías</h3>
        {categorias?.map((c) => (
          <label key={c.id} className="block">
            <input
              type="checkbox"
              onChange={() => toggleCategoria(c.id)}
            />
            {c.nombre}
          </label>
        ))}
      </div>

      <div>
        <h3>Ingredientes</h3>
        {ingredientes?.map((i) => (
          <label key={i.id} className="block">
            <input
              type="checkbox"
              onChange={() => toggleIngrediente(i.id)}
            />
            {i.nombre}
          </label>
        ))}
      </div>

      <button className="bg-green-500 text-white p-2 rounded">
        Guardar
      </button>
    </form>
  );
};

export default ProductoForm;